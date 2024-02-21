from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
from .models import Tournament, Database, Match, Team
from app.utils import stringifyImage, getTextsForLanguage
from app.forms import TournamentForm
from .translations.translation import pages
import json

#==========================================
#      Validate user for Tournaments
#==========================================
def validateUser(playerName, password, request):
    try:
        user = Database.objects.filter(username=playerName).get()
    except Database.DoesNotExist:
        errors = getTextsForLanguage(pages["error"], request)["NonExistingUser"]
        return None, errors
    if not check_password(password, user.password):
        errors = getTextsForLanguage(pages["error"], request)["IncorrectPassword"]
        return None, errors
    return user, ""

#==========================================
#                | UTILS |
#==========================================
def JSONTournamentResponse(tournament, message):
    response = {
            "message" : message,
            "tournament": {
                "id": str(tournament.id),
                "name": tournament.tournament_name,
                "player_amount": tournament.player_amount,
                "completed": tournament.completed,
                "players": [{"name" : user.username} for user in tournament.players.all()],
                "matches": [{"id": match.id,
							"team1-id": match.team1.id,
                            "team1-score": match.team1.score,
                            "team1-players": [{"name": player.username} for player in match.team1.players.all()],
                            "team2-id": match.team2.id,
                            "team2-score": match.team2.score,
                            "team2-players": [{"name": player.username} for player in match.team2.players.all()],
							} for match in tournament.matches.all()],
            }
        }
    return (response)

def unknownMethod(request):
    return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["MethodUnsupported"]}, status=405)

def saveTournament(request, tournament, winnerTeam):
    for player in tournament.players.all():
        player.tournaments_played += 1
        if winnerTeam.players.filter(username=player).first():
            player.tournaments_won += 1
        player.completed_tournaments.add(tournament)
        player.save()
    request.user.tournament = None

#==========================================
#       Tournament | PLAYER | Functions
#==========================================
def tournamentAddPlayer(playerName, password, existing_tournament, request):
    player, reason = validateUser(playerName, password, request)
    if player is None:
        return JsonResponse({'error': reason}, status=400)
    if existing_tournament.players.filter(username=player).first() is not None:
        return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["PlayerInMatch"]}, status=400)
    if existing_tournament.players.count() >= existing_tournament.player_amount:
        return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["MaxPlayers"]}, status=400)
    existing_tournament.players.add(player)
    playerToReturn = {
        "username": player.username,
        "picture": stringifyImage(player) if player.avatar_image else None
    }
    return JsonResponse({'message': 'Player added successfully', 'player':  playerToReturn}, status=200)

def tournamentDeletePlayer(playerName, existing_tournament, request):
    player = Database.objects.filter(username=playerName).first()
    if player is None or existing_tournament.players.filter(username=player.username).first() is None:
        return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["NonExistingUser"]}, status=400)
    else:
        existing_tournament.players.remove(player)
        return JsonResponse({'succes!': 'player got removed'}, status=200)



#==========================================
#        | TOURNAMENT | Functions
#==========================================
def createTurnament(request):
    data = json.loads(request.body)
    if "name" not in data or "number" not in data:
        return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["MissingFieldsBody"]}, status=400)
    tournament = Tournament.objects.create(tournament_name=data['name'], player_amount=data['number'])
    tournament.players.add(request.user)
    request.user.tournament = tournament
    request.user.save()
    return JsonResponse(JSONTournamentResponse(tournament, "Tournament created successfully"), status=200)

def getTournament(tournament):
    return JsonResponse(JSONTournamentResponse(tournament, "Tournament already exist"), status=200)


def deleteTournament(request, tournament):
    tournament.delete()
    request.user.tournament = None
    return JsonResponse({'message': 'Succefully delete tournament'}, status=200)


#==========================================
#        | MATCH | Functions
#==========================================
def updatePlayers(teamData, match, team, otherTeamScore):
    for player in teamData:
        playerObj = Database.objects.filter(username=player).first()
        if playerObj is not None:
            playerObj.completed_matches.add(match)
            playerObj.total_points_scored += team.score
            playerObj.total_points_conceded += otherTeamScore
            playerObj.matches_played += 1
            if team.winner:
                playerObj.matches_won += 1
            team.players.add(playerObj)
            playerObj.save()
    team.save()

def tournamentAddMatch(request, existing_tournament):
    data = json.loads(request.body)
    if 'teamOne' not in data or 'teamTwo' not in data or 'players' not in data['teamOne'] or 'players' not in data['teamTwo'] or 'score' not in data['teamTwo'] or 'score' not in data['teamOne']:
        return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["MissingFieldsBody"]}, status=400)
    teamOne = data["teamOne"]
    teamTwo = data["teamTwo"]

    match = Match.objects.create()
    team1 = Team.objects.create()
    team1.score = teamOne['score']
    team2 = Team.objects.create()
    team2.score = teamTwo['score']
    if team1.score > team2.score:
        winnerTeam = team1
    else:
        winnerTeam = team2
    winnerTeam.winner = True
    updatePlayers(data["teamOne"]['players'], match, team1, team2.score)
    updatePlayers(data["teamTwo"]['players'], match, team2, team1.score)


    match.team1 = team1
    match.team2 = team2
    match.save()
    existing_tournament.matches.add(match)

    if 'stage' in data and data['stage'] == 'Final' and existing_tournament.matches.count() > 1:
        existing_tournament.completed = True
        existing_tournament.save()
        saveTournament(request, existing_tournament, winnerTeam)

    return JsonResponse({'message': 'Succefully saved match'}, status=200)


#====================================================================================
#====================================================================================
#                               Tournament Manager
#====================================================================================
#====================================================================================
#==========================================
#         Tournament Management
#==========================================
def tournamentManager(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["UnauthenticatedUser"]}, status=401)
    existing_tournament = request.user.tournament
    if existing_tournament is not None:
        # Call the function from the switch dictionary
        match request.method:
            case "GET":
                return getTournament(existing_tournament)
            case "DELETE":
                return deleteTournament(request, existing_tournament)
            case "POST":
                deleteTournament(request, existing_tournament)
                return createTurnament(request)
            case _:
                return unknownMethod(request)
    else:
        if request.method == "POST":
            return createTurnament(request)
        else:
            return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["NoOngoingTournament"]}, status=404)


#==========================================
#         TournamentID Manager
#==========================================
def tournamentManagerID(request, id=None):
    existing_tournament = Tournament.objects.filter(id=id).first()
    if existing_tournament is not None:
        # Call the function from the switch dictionary
        match request.method:
            case "GET":
                return getTournament(existing_tournament)
            case "DELETE":
                return deleteTournament(request, existing_tournament)
            case _:
                return unknownMethod(request)
    else:
        return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["NoOngoingTournament"]}, status=404)

#==========================================
#         Tournament ID Player Management
#==========================================
def tournamentPlayerManager(request, id=None):
    existing_tournament = Tournament.objects.filter(id=id).first()
    data = json.loads(request.body)
    if "player" in data and existing_tournament is not None:
        match request.method:
            case "POST":
                form = TournamentForm(data)
                if not form.is_valid():
                    errors = {field: form.errors[field][0] for field in form.errors}
                    reason = next(val for val in errors.values())
                    return JsonResponse({"success": "false", "error":reason}, status=400)
                return tournamentAddPlayer(data['player'], data['password'], existing_tournament, request)
            case "DELETE":
                return tournamentDeletePlayer(data['player'], existing_tournament, request)
            case _:
                return unknownMethod(request)
    else:
        return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["Wrong"]}, status=400)

#==========================================
#         Tournament ID Match Management
#==========================================
def tournamentMatchManager(request, id=None):
    existing_tournament = Tournament.objects.filter(id=id).first()
    if existing_tournament is not None:
        match request.method:
            case "POST":
                return tournamentAddMatch(request, existing_tournament)
            case _:
                return unknownMethod(request)
    else:
        return JsonResponse({'error': getTextsForLanguage(pages["error"], request)["Wrong"]}, status=400)
