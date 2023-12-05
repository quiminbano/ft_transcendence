from django.http import JsonResponse
from django.core.serializers import serialize
# from api.models import models
import json
import os

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