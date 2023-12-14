from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .models import Tournament, Players, CustomUserData
from .tournamentController import unknownMethod, createTurnament, deleteTournament, getTournament, tournamentAddPlayer, tournamentUpdatePlayer
import json



#==========================================
#         Tournament Management
#==========================================
def tournamentManager(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
    existing_tournament = Tournament.objects.filter(uuid=request.user.uuid)
    if existing_tournament.exists():
        # Call the function from the switch dictionary
        print("EXIST")
        match request.method:
            case "GET":
                return getTournament(existing_tournament)
            case "DELETE":
                return deleteTournament(existing_tournament)
            case _:
                return unknownMethod()
    else:
        if request.method == "POST":
            print("NO EXIST")
            return createTurnament(request)
        else:
            return JsonResponse({'error': 'User does not have an tournament going'}, status=404)
        

#==========================================
#         TournamentID Manager
#==========================================
def tournamentManagerID(request, id=None):
    existing_tournament = Tournament.objects.filter(id=id)
    if existing_tournament.exists():
        # Call the function from the switch dictionary
        print("EXIST")
        match request.method:
            case "GET":
                return getTournament(existing_tournament)
            case "POST":
                return tournamentAddPlayer(request, existing_tournament)
            case "DELETE":
                return deleteTournament(existing_tournament)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'User does not have an tournament going'}, status=404)

#==========================================
#         Tournament Player Management
#==========================================
def tournamentManagerPlayerID(request, id=None):
    player = Players.objects.filter(id=id).first()
    if player is not None:
        print("Player ID EXIST")
        match request.method:
            case "PUT":
                return tournamentUpdatePlayer(request)
            # case "DELETE":
            #     return deleteTournament(existing_tournament)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'player does not exist'}, status=400)




















# #==========================================
# #       Tournament Player Management
# #==========================================
# def tournamentPlayer(request):
#     data = json.loads(request.body)

#     print ("paler")

#     if(request.method == "POST"):
#         print ("method POST")
#         if "player" not in data or "id" not in data:
#           return JsonResponse({'error': 'missing fields in request body'}, status=400)
#         tournament = Tournament.objects.filter(id=data['id'])
#         player = Players.objects.create(name=data['player'])
#         if tournament.exists():
#             tournament.first().players.add(player)
#         else:
#           return JsonResponse({'error': 'tournament does not exist'}, status=400)
#         playerdict = model_to_dict(player)
#         return JsonResponse({'message': 'Player added successfully', 'player': playerdict}, status=200)

#     elif(request.method == "PUT"):
#         print ("method PUT")
#         print (data)
#         if "id" not in data or "username" not in  data:
#           return JsonResponse({'error': 'missing fields in request body'}, status=400)
#         player = Players.objects.filter(id=data['id'])
#         if player.exists():
#             player.first().name =  data["username"]
#         else:
#           return JsonResponse({'error': 'player does not exist'}, status=400)
#         playerdict = model_to_dict(player.first())
#         return JsonResponse({'message': 'Player name change succefull', 'player': playerdict}, status=200)

#     elif(request.method == "DELETE"):
#         print ("method DELETE")
#         if "playerID" not in data or "id" not in  data:
#           return JsonResponse({'error': 'missing fields in request body'}, status=400)
#         tournament = Tournament.objects.filter(id=data['id'])
#         player = Players.objects.filter(id=data['playerID'])
#         if player.exists() and tournament.exists():
#             tournament.first().players.remove(player.first())
#             player.first().delete()
#         else:
#           return JsonResponse({'error': 'player or tournament does not exist'}, status=400)

#     else:
#         return JsonResponse({'error': 'We dont handle this request here'}, status=400)


# #==========================================
# #           Tournament Management
# #==========================================


 
# def tournament(request):
#     # if id != null && request.user.tournament.id == id
#     #     check wich method are we calling
#     #     call the function of the method
#     #Validate request
#     if not request.user.is_authenticated:
#         return JsonResponse({'error': 'User is not authenticated'}, status=401)

#     existing_tournament = Tournament.objects.filter(uuid=request.user.uuid)

#     if(request.method == "GET"):
#         #if user already has i tournemnt on going return it.
#         if existing_tournament.exists():
#             return JsonResponse(createTournamentResponse(existing_tournament.first(), "Tournament already exist"), status=200)
#         else:
#             return JsonResponse({'error': 'User does not have an tournament going'}, status=404)

#     elif(request.method == "POST"):
#         #if user already has a tournemnt on going return it.
#         if existing_tournament.exists():
#             existing_tournament.first().delete()
#             # return JsonResponse(createTournamentResponse(existing_tournament.first(), request.user.uuid, "Tournament already exist"), status=200)

#         data = json.loads(request.body)
#         if "name" not in data or "number" not in data:
#             return JsonResponse({'error': 'missing fields in request body'}, status=400)

#         #Create a tournament object and add the player to it
#         tournament = Tournament.objects.create(name=data['name'], amount=data['number'], uuid=request.user.uuid)
#         playerName = Players.objects.create(name=data['player'])
#         tournament.players.add(playerName)
#         return JsonResponse(createTournamentResponse(tournament, "Tournament created successfully"), status=200)
    
#     elif(request.method == "DELETE"):

#         if existing_tournament.exists():
#             existing_tournament.first().delete()
#             return JsonResponse({'message': 'Succefully delete tournament'}, status=200)
#         else:
#             return JsonResponse({'error': 'User does not have an tournament going'}, status=400)

#     else:

#         return JsonResponse({'error': 'We dont handle this request here'}, status=400)
    


# #==========================================
# #      Tournament Management With ID
# #==========================================
# def tournamentWithID(request, id=None):
#     print("HELLO")
#     existing_tournament = Tournament.objects.filter(id=id)

#     if(request.method == "GET"):
#         if existing_tournament.exists():
#             return JsonResponse(createTournamentResponse(existing_tournament.first(), "Tournament already exist"), status=200)
#         else:
#             return JsonResponse({'error': 'This tournament ID does not exist'}, status=400)
#     elif(request.method == "DELETE"):
#         if existing_tournament.exists():
#             for player in existing_tournament.first().players.all():
#                 player.delete()
#             existing_tournament.first().delete()
#             return JsonResponse({'message': 'Succefully delete tournament'}, status=200)
#         else:
#             return JsonResponse({'error': 'This tournament ID does not exist'}, status=400)
#     else:
#         return JsonResponse({'error': 'We dont handle this request here'}, status=400)
        




