from django.http import JsonResponse, QueryDict
from django.forms.models import model_to_dict
from .models import Database
from app.forms import ProfilePicture
from app.utils import stringifyImage
from django.shortcuts import redirect
from django.contrib.auth import logout
import json

#==========================================================================
#                (REQUEST) ADD Friend and REMOVE Friend
#==========================================================================
def friendRequest(request, friendName=None):
    user = request.user
    if not user.is_authenticated:
        return redirect('/login')
    if user.online_status == False:
        logout(request)
        return redirect('/login')
    if (request.method == "GET" and friendName==None):
        requests = []
        for friend_request in user.friend_requests.all():
            FriendObject = {
                "username" : friend_request.username,
                "avatar_image" : stringifyImage(friend_request) if friend_request.avatar_image else None
            }
            requests.append(FriendObject)
        return JsonResponse(requests, status=200, safe=False)
    potentailFriend = Database.objects.filter(username=friendName).first()
    if potentailFriend is None:
        return JsonResponse({"message":"user does not exist"}, status=400)
    if user == potentailFriend:
        return JsonResponse({"message":"you cant manipulate yourself"}, status=400)
    
    match request.method:
        case "POST":
            if user.friends.filter(username=potentailFriend.username).exists():
                return JsonResponse({"message":"already friends"}, status=400)
            if potentailFriend.friend_requests.filter(username=user.username).exists():
                return JsonResponse({"message":"already sent friend request"}, status=400)
            if user.friend_requests.filter(username=potentailFriend.username).exists():
                user.friend_requests.remove(potentailFriend)
                user.friends.add(potentailFriend)
                return JsonResponse({"message":"Both sent friend request, firendship established!"}, status=200)
            else:
                potentailFriend.friend_requests.add(user)
                return JsonResponse({"message":"Success sent friend request"}, status=200)
        case "DELETE":
            if potentailFriend.friend_requests.filter(username=user.username).exists():
                potentailFriend.friend_requests.remove(user)
                return JsonResponse({"message":"Success removed friend request"}, status=200)
            return JsonResponse({"message":"No friend request sent"}, status=200)
        case _:
            return JsonResponse({"message": "Method not implemented"}, status=501)

    
    
    
        

#==========================================================================
#                   ACCEPT Friend and REMOVE Friend
#==========================================================================
def friends(request, friendName=None):
    user = request.user
    if not user.is_authenticated:
        return redirect('/login')
    if user.online_status == False:
        logout(request)
        return redirect('/login')
    friend = Database.objects.filter(username=friendName).first()
    if friend is None:
        return JsonResponse({"message":"this user does not exist"}, status=400)
    match request.method:
        case "POST":
            if user.friend_requests.filter(username=friend.username).exists():
                user.friend_requests.remove(friend)
                user.friends.add(friend)
                return JsonResponse({"message":"Success added friend"}, status=200)
            return JsonResponse({"message":"No friend request from that user"}, status=400)
        case "DELETE":
            if user.friends.filter(username=friend.username).exists():
                user.friends.remove(friend)
                return JsonResponse({"message":"Success removed friend"}, status=200)
            return JsonResponse({"message":"you are not friends"}, status=400)
        case _:
            return JsonResponse({"message": "Method not implemented"}, status=501)



#==========================================================================
#         GET USER FRIENDS (Returns all friends of the logged in user)
#==========================================================================
def getFriends(request):
    user = request.user
    if not user.is_authenticated:
        return redirect('/login')
    if user.online_status == False:
        logout(request)
        return redirect('/login')
    if request.method != "GET":
        return JsonResponse({"message": "Method not implemented"}, status=501)
    user_friends = []
    for friend in user.friends.all():
        user_friend = {
            "username" : friend.username,
            "avatar_image" : stringifyImage(friend) if friend.avatar_image else None,
            "online_status" : friend.online_status,
        }
        user_friends.append(user_friend)
    return JsonResponse(user_friends, status=200, safe=False)


#==========================================================
#         USER SEARCH (Return all associated users)
#==========================================================
def searchUsers(request, search=None):
    if not request.user.is_authenticated:
        return redirect('/login')
    if request.user.is_login == False:
        logout(request)
        return redirect('/login')
    if request.method != "GET":
        return JsonResponse({"message": "Method not implemented"}, status=501)
    users = Database.objects.filter(username__icontains=search)
    user_friends = []
    for user in users:
        user_friend = {
            "username" : user.username,
            "avatar_image" : stringifyImage(user) if user.avatar_image else None,
        }
        user_friends.append(user_friend)
    return JsonResponse(user_friends, status=200, safe=False)

#==========================================================
#         GET SPECIFIC USER
#==========================================================
def getObjectsWithinUser(user_dict):
    if user_dict.get('friends'):
        user_dict['friends'] = [{
            'username': friend.username,
            'avatar_image': stringifyImage(friend) if friend.avatar_image else None
    } for friend in user_dict['friends']]
    if user_dict.get('friend_requests'):
        user_dict['friend_requests'] = [{
            'username': friend_requests.username,
            'avatar_image': stringifyImage(friend_requests) if friend_requests.avatar_image else None
        } for friend_requests in user_dict['friend_requests']]
    if user_dict.get('completed_matches'):
        user_dict['completed_matches'] = [{
            'id': completed_matches.id,
            "tournament_name": completed_matches.tournament_name,
            "amount": completed_matches.amount,
            "state": completed_matches.state,
            "date": completed_matches.date,
            "players": [
                {'name': player.name, 'score': player.score} for player in completed_matches.players.all()
            ]
        } for completed_matches in user_dict['completed_matches']]
    
def getUser(request, userName=None):
#I removed the check for if the user is authenticated or not. Because, before calling getUser, we check it in usersPage function. The state is not gonna change, because getUser is being called just there.
    user = Database.objects.filter(username=userName).first()
    if user is None:
        return None
    if request.method == "GET":
        user_dict = model_to_dict(user)
        user_dict['avatar_image'] = stringifyImage(user) if user.avatar_image else None
        user_dict.pop('password', None)
        getObjectsWithinUser(user_dict)
        return JsonResponse(user_dict, status=200, safe=False)
    return JsonResponse({"message": "Method not implemented"}, status=501)

#==========================================================
#         GET LOGGED IN USER
#==========================================================
def Users(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    if request.user.is_login == False:
        logout(request)
        return redirect('/login')
    user = request.user
    match request.method:
        case "GET":
            user_dict = model_to_dict(user)
            user_dict['avatar_image'] = stringifyImage(user) if user.avatar_image else None
            user_dict.pop('password', None)
            getObjectsWithinUser(user_dict)
            return JsonResponse(user_dict, status=200, safe=False)
        case "DELETE":
            user.delete()
            return JsonResponse({"message":"Success"}, status=200, safe=False)
        case _:
            return JsonResponse({"message": "Method not implemented"}, status=501)


#==========================================
#          Mtach Hisory
#==========================================
def getMatchHistory(request, userName):
    if not request.user.is_authenticated:
        return redirect('/login')
    if request.user.is_login == False:
        logout(request)
        return redirect('/login')
    user = Database.objects.filter(username=userName).first()
    if user is None:
        return redirect('/')
    if request.method == "GET":
        history = []
        for matches in user.completed_matches.all():
            match = {
            'id': matches.id,
            "tournament_name": matches.tournament_name,
            "amount": matches.amount,
            "state": matches.state,
            "date": matches.date,
            "players": [
                {'name': player.name, 'score': player.score} for player in matches.players.all()
            ]
            }
            history.append(match)
        return JsonResponse(history, status=200, safe=False)
    return JsonResponse({"message": "Method not implemented"}, status=501)


#==========================================
#          Profile Picture
#==========================================

def profilePicture(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    if request.user.is_login == False:
        logout(request)
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

