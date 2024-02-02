from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .models import Match, Players
import json

#==========================================
#                   Utils
#==========================================
def JSONMatchResponse(match, message):
    response = {
            "message" : message,
            "match": {
                "id": str(match.id),
                "name": match.match_name,
                "amount": match.amount,
                "state": match.state,
                "players": [{"name" : player.name, "id" : player.id} for player in match.players.all()],
            }
        }
    return (response)

def unknownMethod():
    return JsonResponse({'error': 'Method not supported'}, status=405)

#==========================================
#       Match Player Functions                                                                                                                                           
#==========================================
def matchAddPlayer(request, match):
    data = json.loads(request.body)
    if "player" not in data:
        return JsonResponse({'error': 'missing fields in request body'}, status=400)
    player = Players.objects.create(name=data['player'])
    match.players.add(player)
    playerdict = model_to_dict(player)
    if match.players.count() >= match.amount:
        match.state = 'A'
        match.save()
    return JsonResponse({'message': 'Player added successfully', 'player': playerdict}, status=200)

def matchUpdatePlayer(request):
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

def matchDeletePlayer(player):
    match = Match.objects.filter(players=player).first()
    if match is not None:
        match.players.remove(player)
        player.delete()
        if match.players.count() < match.amount:
            match.state = 'P'
            match.save()
        return JsonResponse({'succes!': 'player got removed'}, status=200)
    else:
        return JsonResponse({'error': 'player or match does not exist'}, status=400)


#==========================================
#         Match Functions                                                                                                                                           
#==========================================
def createTurnament(request):
    data = json.loads(request.body)
    if "name" not in data or "number" not in data:
        return JsonResponse({'error': 'missing fields in request body'}, status=400)
    #Create a match object and add the player to it
    match = Match.objects.create(match_name=data['name'], amount=data['number'])
    playerName = Players.objects.create(name=data['player'])
    match.players.add(playerName)
    request.user.match = match
    request.user.save()
    print(match.match_name)
    return JsonResponse(JSONMatchResponse(match, "Match created successfully"), status=200)

def getMatch(match):
    return JsonResponse(JSONMatchResponse(match, "Match already exist"), status=200)


#
#
#
#
#       TEMPORARY ADD MATCHES TO COMPLETED COLUMN IF THEY ARE ACTIVE CHANGE THIS TO BE BETTER MANAGE!!!!!
#                                               (READ!!!)
#
#
#
def deleteMatch(request, match):
    if match.state == 'A':
        print("MOVE")
        request.user.completed_matches.add(match)
        match.delete()
    else:
        print("DELE")
        for MatchPlayer in match.players.all():
            MatchPlayer.delete()
        match.delete()
    return JsonResponse({'message': 'Succefully delete match'}, status=200)


#====================================================================================
#====================================================================================
#                               Match Manager
#====================================================================================
#====================================================================================
#==========================================
#         Match Management
#==========================================
def matchManager(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
    existing_match = request.user.match
    if existing_match is not None:
        # Call the function from the switch dictionary
        match request.method:
            case "GET":
                return getMatch(existing_match)
            case "DELETE":
                return deleteMatch(request, existing_match)
            case "POST":
                deleteMatch(request, existing_match)
                return createTurnament(request)
            case _:
                return unknownMethod()
    else:
        if request.method == "POST":
            return createTurnament(request)
        else:
            return JsonResponse({'error': 'User does not have an match going'}, status=404)
        

#==========================================
#         MatchID Manager
#==========================================
def matchManagerID(request, id=None):
    existing_match = Match.objects.filter(id=id).first()
    if existing_match is not None:
        # Call the function from the switch dictionary
        match request.method:
            case "GET":
                return getMatch(existing_match)
            case "POST":
                return matchAddPlayer(request, existing_match)
            case "DELETE":
                return deleteMatch(request, existing_match)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'User does not have an match going'}, status=404)

#==========================================
#         Match Player Management
#==========================================
def matchPlayer(request):
    data = json.loads(request.body)
    print(data)
    print(request.method)
    match request.method:
        case "PUT":
            return(matchUpdatePlayer(request))
        case _:
            return unknownMethod()




#==========================================
#         Match Player ID Management
#==========================================
def matchManagerPlayerID(request, id=None):
    player = Players.objects.filter(id=id).first()
    if player is not None:
        match request.method:
            case "DELETE":
                return matchDeletePlayer(player)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'player does not exist'}, status=400)


