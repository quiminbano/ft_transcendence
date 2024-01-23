from django.http import JsonResponse, QueryDict
from django.forms.models import model_to_dict
from .models import Database
from app.forms import ProfilePicture
from app.utils import stringifyImage
from django.shortcuts import redirect
import json

#==========================================================================
#         GET USER FRIENDS (Returns all friends of the logged in user)
#==========================================================================
def getFriends(request):
    user = request.user
    if not user.is_authenticated:
        return redirect('/login')
    user_friends = []
    for friend in user.friends.all():
        user_friend = {
            "username" : friend.username,
            "avatarImage" : stringifyImage(friend) if friend.avatarImage else None,
            "onlineStatus" : friend.onlineStatus,
        }
        user_friends.append(user_friend)
    return JsonResponse(user_friends, safe=False)


#==========================================================
#         USER SEARCH (Return all associated users)
#==========================================================
def searchUsers(request, search=None):
    if not request.user.is_authenticated:
        return redirect('/login')
    users = Database.objects.filter(username__icontains=search)
    user_friends = []
    for user in users:
        user_friend = {
            "username" : user.username,
            "UUID" : user.uuid,
            "avatarImage" : stringifyImage(user) if user.avatarImage else None,
        }
        user_friends.append(user_friend)
    return JsonResponse(user_friends, safe=False)


def getUser(request, userName=None):
    print(userName)
    user = Database.objects.filter(username=userName).first()
    if user is None:
        return JsonResponse({"message":"User dose not exist"}, safe=False, status=401)
    if request.method == "GET":
        user_dict = model_to_dict(user)
        user_dict['avatarImage'] = stringifyImage(user) if user.avatarImage else None
        user_dict.pop('password', None)
        if user_dict.get('friends'):
            user_dict['friends'] = [friend.uuid for friend in user_dict['friends']]
        return JsonResponse(user_dict, safe=False, status=200)
    return JsonResponse({"message": "Method not implemented"}, status=501)


def Users(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    user = request.user
    match request.method:
        case "GET":
            user_dict = model_to_dict(user)
            user_dict['avatarImage'] = stringifyImage(user) if user.avatarImage else None
            user_dict.pop('password', None)
            if user_dict.get('friends'):
                user_dict['friends'] = [friend.uuid for friend in user_dict['friends']]
            return JsonResponse(user_dict, safe=False, status=200)
        case "DELETE":
            user.delete()
            return JsonResponse({"message":"Success"}, safe=False, status=200)
        case _:
            return JsonResponse({"message": "Method not implemented"}, status=501)


#==========================================
#          Profile Picture
#==========================================

def profilePicture(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    if request.method == 'POST':
        form = ProfilePicture(request.POST, request.FILES)
        if form.is_valid():
            form.save(request.user)
            source = stringifyImage(request.user)
            return JsonResponse({"source": source, "message": "Avatar image updated sucessfully"}, status=200)
        else:
            return JsonResponse({"success": "false", "message": "Failed to update the avatar picture"}, status=400)
    return JsonResponse({"success": "false", "message": "Accessing to an API route, not allowed"}, status=400)
