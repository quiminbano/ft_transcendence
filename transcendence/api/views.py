from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .models import Tournament, Players
import json
import os

def tournamentPlayer(request):
    data = json.loads(request.body)

    tournament = Tournament.objects.get(uuid=data['uuid'])

    player = Players.objects.create(name=data['player'])
    tournament.players.add(player)

    playerdict = model_to_dict(player)

    return JsonResponse({'message': 'Player added successfully', 'player': playerdict})


def tournament(request):
    data = json.loads(request.body)

    tournament = Tournament.objects.create(name=data['name'], amount=data['number'])

    player = Players.objects.create(name=data['player'])
    tournament.players.add(player)

    response = {
        "message" : "Tournament created successfully",
        "tournament": {
            "uuid": str(tournament.uuid),
            "name": tournament.name,
            "amount": tournament.amount,
            "state": tournament.sate,
            "players": [player.name for player in tournament.players.all()],
        }
    }
    # tournamentdict = model_to_dict(tournament)
    # tournamentdict['players'] = list(tournament.players.values_list('name', flat=True))

    return JsonResponse(response)




def hello(request):

    print("1")
    print("Current working directory:", os.getcwd())

    # dir_path = os.path.dirname(os.path.realpath(__file__))
    # file_path = os.path.join(dir_path, 'userMock.json')
    with open('userMock.json', 'r') as file:
    # with open(file_path, 'r') as file:
       mockData = json.load(file)
    print("2")
    
    fetchedUser = {
    #    'uuid': mockData['uuid'],
    #    'onlineStatus': mockData['onlineStatus'],
    #    'loginName': mockData['loginName'],
    #    'loginPassword': mockData['loginPassword'],
    #    'email': mockData['email'],
       'friends': [
           {
               'uuid': friend['uuid'],
               'addedDate': friend['addedDate']
           } for friend in mockData['friends']
       ]
   }
    print("3")
    print(fetchedUser)
    print("4")
    # responseFromMockData = serialize()
    return JsonResponse(fetchedUser)