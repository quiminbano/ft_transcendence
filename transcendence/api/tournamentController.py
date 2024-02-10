from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .models import Tournament, Players, Database, Match, Team
import json

#==========================================
#                   Utils
#==========================================
def JSONTournamentResponse(tournament, message):
    response = {
            "message" : message,
            "tournament": {
                "id": str(tournament.id),
                "name": tournament.tournament_name,
                "teams": tournament.teams,
                "completed": tournament.completed,
                "winner" : tournament.winner,
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
    print (response)
    return (response)

def unknownMethod():
    return JsonResponse({'error': 'Method not supported'}, status=405)

#==========================================
#       Tournament Player Functions                                                                                                                                           
#==========================================
def tournamentAddPlayer(request, tournament):
    data = json.loads(request.body)
    if "player" not in data:
        return JsonResponse({'error': 'missing fields in request body'}, status=400)
    player = Players.objects.create(name=data['player'])
    tournament.players.add(player)
    playerdict = model_to_dict(player)
    if tournament.players.count() >= tournament.amount:
        tournament.state = 'A'
        tournament.save()
    return JsonResponse({'message': 'Player added successfully', 'player': playerdict}, status=200)

def tournamentUpdatePlayer(request):
    data = json.loads(request.body)
    if "id" not in data or "username" not in data:
        return JsonResponse({'error': 'missing fields in request body'}, status=400)
    player = Players.objects.filter(id=data['id']).first()
    if player is not None:
        player.name =  data["username"]
        player.save()
    else:
        return JsonResponse({'error': 'player does not exist'}, status=400)
    playerdict = model_to_dict(player)
    return JsonResponse({'message': 'Player name change succefull', 'player': playerdict}, status=200)

def tournamentDeletePlayer(player):
    tournament = Tournament.objects.filter(players=player).first()
    if tournament is not None:
        tournament.players.remove(player)
        player.delete()
        if tournament.players.count() < tournament.amount:
            tournament.state = 'P'
            tournament.save()
        return JsonResponse({'succes!': 'player got removed'}, status=200)
    else:
        return JsonResponse({'error': 'player or tournament does not exist'}, status=400)


#==========================================
#         Tournament Functions                                                                                                                                           
#==========================================
def createTurnament(request):
    data = json.loads(request.body)
    if "name" not in data or "number" not in data:
        return JsonResponse({'error': 'missing fields in request body'}, status=400)
    print (data)
    #Create a tournament object and add the player to it
    tournament = Tournament.objects.create(tournament_name=data['name'], teams=data['number'])
    tournament.matches.add(
        Match.objects.create(
			team1=Team.objects.create(),
            team2=Team.objects.create()
	))
    tournament.matches.first().team1.players.add(request.user)
    print(tournament.tournament_name)
    return JsonResponse(JSONTournamentResponse(tournament, "Tournament created successfully"), status=200)

def getTournament(tournament):
    return JsonResponse(JSONTournamentResponse(tournament, "Tournament already exist"), status=200)


#
#
#
#
#       TEMPORARY ADD MATCHES TO COMPLETED COLUMN IF THEY ARE ACTIVE CHANGE THIS TO BE BETTER MANAGE!!!!!
#                                               (READ!!!)
#
#
#
def deleteTournament(request, tournament):
    if tournament.completed == True:
        print("MOVE")
        request.user.completed_matches.add(tournament)
        tournament.delete()
    else:
        print("DELE")
        tournament.delete()
    return JsonResponse({'message': 'Succefully delete tournament'}, status=200)


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
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
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
                return unknownMethod()
    else:
        if request.method == "POST":
            return createTurnament(request)
        else:
            return JsonResponse({'error': 'User does not have an tournament going'}, status=404)
        

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
            case "POST":
                return tournamentAddPlayer(request, existing_tournament)
            case "DELETE":
                return deleteTournament(request, existing_tournament)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'User does not have an tournament going'}, status=404)

#==========================================
#         Tournament Player Management
#==========================================
def tournamentPlayer(request):
    data = json.loads(request.body)
    print(data)
    print(request.method)
    match request.method:
        case "PUT":
            return(tournamentUpdatePlayer(request))
        case _:
            return unknownMethod()




#==========================================
#         Tournament Player ID Management
#==========================================
def tournamentManagerPlayerID(request, id=None):
    player = Players.objects.filter(id=id).first()
    if player is not None:
        match request.method:
            case "DELETE":
                return tournamentDeletePlayer(player)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'player does not exist'}, status=400)


