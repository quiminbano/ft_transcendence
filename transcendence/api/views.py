from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .models import Tournament, Players
import json
import os

def tournamentPlayer(request):
    data = json.loads(request.body)

    tournament = Tournament.objects.get(id=data['id'])

    player = Players.objects.create(name=data['player'])
    tournament.players.add(player)

    playerdict = model_to_dict(player)

    return JsonResponse({'message': 'Player added successfully', 'player': playerdict}, status=200)


def tournament(request):
    data = json.loads(request.body)

    tournament = Tournament.objects.create(name=data['name'], amount=data['number'])

    player = Players.objects.create(name=data['player'])
    tournament.players.add(player)

    response = {
        "message" : "Tournament created successfully",
        "tournament": {
            "id": str(tournament.id),
            "name": tournament.name,
            "amount": tournament.amount,
            "state": tournament.sate,
            "players": [player.name for player in tournament.players.all()],
        }
    }
    # tournamentdict = model_to_dict(tournament)
    # tournamentdict['players'] = list(tournament.players.values_list('name', flat=True))

    return JsonResponse(response, status=200)