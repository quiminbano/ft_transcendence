from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .models import Tournament, Players, CustomUserData
import json


def createTournamentResponse(tournament, uuid, message):
    response = {
            "message" : message,
            "tournament": {
                "id": str(tournament.id),
                "uuid": uuid,
                "name": tournament.name,
                "amount": tournament.amount,
                "state": tournament.sate,
                "players": [player.name for player in tournament.players.all()],
            }
        }
    return (response)

def tournamentPlayer(request):
    data = json.loads(request.body)

    if(request.method == "POST"):
        if "player" not in data or "id" not in data:
          return JsonResponse({'error': 'missing fields in request body'}, status=400)
        tournament = Tournament.objects.filter(id=data['id'])
        player = Players.objects.create(name=data['player'])
        if tournament.exists():
            tournament.first().players.add(player)
        else:
          return JsonResponse({'error': 'tournament does not exist'}, status=400)
        playerdict = model_to_dict(player)
        return JsonResponse({'message': 'Player added successfully', 'player': playerdict}, status=200)
    
    elif(request.method == "PUT"):
        if "playerID" not in data or "name" not in  data:
          return JsonResponse({'error': 'missing fields in request body'}, status=400)
        player = Players.objects.filter(id=data['playerID'])
        if player.exists():
            player.first().name =  data["name"]
        else:
          return JsonResponse({'error': 'player does not exist'}, status=400)
        playerdict = model_to_dict(player)
        return JsonResponse({'message': 'Player name change succefull', 'player': playerdict}, status=200)

    elif(request.method == "DELETE"):
        if "playerID" not in data or "id" not in  data:
          return JsonResponse({'error': 'missing fields in request body'}, status=400)
        tournament = Tournament.objects.filter(id=data['id'])
        player = Players.objects.filter(id=data['playerID'])
        if player.exists() and tournament.exists():
            tournament.first().players.remove(player.first())
            player.first().delete()
        else:
          return JsonResponse({'error': 'player or tournament does not exist'}, status=400)

    else:
        return JsonResponse({'error': 'We dont handle this request here'}, status=400)


def tournament(request):
    #Validate request
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
    
    existing_tournament = Tournament.objects.filter(uuid=request.user.uuid)

    if(request.method == "GET"):

        #if user already has i tournemnt on going return it.
        if existing_tournament.exists():
            return JsonResponse(createTournamentResponse(existing_tournament.first(), request.user.uuid, "Tournament already exist"), status=200)
        else:
            return JsonResponse({'error': 'User does not have an tournament going'}, status=400)
        
    elif(request.method == "POST"):

        #if user already has a tournemnt on going return it.
        if existing_tournament.exists():
            return JsonResponse(createTournamentResponse(existing_tournament.first(), request.user.uuid, "Tournament already exist"), status=200)

        data = json.loads(request.body)
        if "name" not in data or "number" not in data:
            return JsonResponse({'error': 'missing fields in request body'}, status=400)

        #Create a tournament object and add the player to it
        tournament = Tournament.objects.create(name=data['name'], amount=data['number'], uuid=request.user.uuid)
        playerName = Players.objects.create(name=data['player'])
        tournament.players.add(playerName)
        return JsonResponse(createTournamentResponse(tournament, request.user.uuid, "Tournament created successfully"), status=200)
    
    elif(request.method == "DELETE"):

        if existing_tournament.exists():
            existing_tournament.first().delete()
            return JsonResponse({'message': 'Succefully delete tournament'}, status=200)
        else:
            return JsonResponse({'error': 'User does not have an tournament going'}, status=400)

    else:

        return JsonResponse({'error': 'We dont handle this request here'}, status=400)
