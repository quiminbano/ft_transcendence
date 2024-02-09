from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from .forms import SignupForm, LoginForm, ChangeProfile, ProfilePicture
from django.http import JsonResponse
from .utils import stringifyImage, setOffline, setOnline
from api.userController import getUser
from api.api42 import getTokens
import json
import time

#@login_required(login_url="/login")
def dashboard(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    if request.user.is_login == False:
        setOffline(user=request.user)
        logout(request)
        return redirect('/login')
    if (request.user.is_42 == True) and (time.time() > request.user.expiration_time):
        return getTokens(request.user.refresh_token, 'refresh_token', 'refresh_token', '/dashboard', request)
    coallition = request.user.coallition
    form = ProfilePicture()
    source = stringifyImage(request.user)
    is_42 = request.user.is_42
    matches = lastGames.copy()
    for match in matches:
        match = processMatch(match, request.user.username)
    stats = calculateStats(matches)
    context = { "content": "dashboard.html", "coallition": coallition, "form" : form, "source" : source, "is_42" : is_42, "lastGames": matches, "stats": stats}
    return render(request, "index.html", context)

def getFriendState(request, friend_requests, friends):
    friendState = "F"
    for request_data in friend_requests:
        if request_data["username"] == request.user.username:
            friendState = "P"
            break
    for request_data in friends:
        if request_data["username"] == request.user.username:
            friendState = "T"
            break
    return friendState

def usersPage(request, name):
    if not request.user.is_authenticated:
        return redirect('/login')
    if request.user.is_login == False:
        setOffline(user=request.user)
        logout(request)
        return redirect('/login')
    setOnline(user=request.user)
    source = stringifyImage(request.user)
    expectedUser = getUser(request, name)
    if expectedUser == None:
        return redirect("/404")
    data = json.loads(expectedUser.content.decode())
    #TODO: change this data to the real user data!!!!!!!!!
    is_42 = request.user.is_42
    matches = lastGames.copy()
    for match in matches:
        match = processMatch(match, name)
    info = {
        "username": name,
        "online": data["online_status"],
        "isFriend": getFriendState(request, data["friend_requests"], data["friends"]),
        "coallition": data["coallition"]
    }
    stats = calculateStats(matches)
    client = {
        "info": info,
        "stats": stats,
        "lastGames": matches
    }
    context = {
        "content": "usersPage.html",
        "source": source,
        "client": client,
        "is_42" : is_42,
    }
    return render(request, "index.html", context)

def getLoginUser(request):
    form = LoginForm()
    context = {
        "form": form,
        "content": "login.html"
    }
    return render(request, 'index.html', context)

def postLoginUser(request):
    data = json.loads(request.body)
    form = LoginForm(data)
    if form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        userModel = get_user_model()
        try:
            userDatabase = userModel.objects.filter(username=username).get()
        except userModel.DoesNotExist:
           return JsonResponse({"success": "false", "message": "Invalid credentials"}, status=400)
        if userDatabase.is_42 == True:
           return JsonResponse({"success": "false", "message": "Invalid credentials"}, status=400)
        user = authenticate(request, username=username, password=password)
        if user:
            userDatabase.online_status = True
            userDatabase.is_login = True
            userDatabase.full_clean()
            userDatabase.save()
            login(request, user)
            return JsonResponse({"success": "true", "message": "Login completed successfuly"}, status=200)
        else:
            return JsonResponse({"success": "false", "message": "Invalid credentials"}, status=400)
    else:
        return JsonResponse({"success": "false", "message": "the form is invalid"}, status=400)

def loginUser(request):
    if request.user.is_authenticated:
        return dashboard(request)
    match request.method:
        case "GET":
            return getLoginUser(request)
        case "POST":
            return postLoginUser(request)

def logoutUser(request):
    request.user.is_login = False
    setOffline(user=request.user)
    logout(request)
    return JsonResponse({"success": "true", "message": "logout succeeded"}, status=200)

def getSignup(request):
    form = SignupForm()
    context = {
        "form": form,
        "content": "signup.html"
    }
    return render(request, 'index.html', context)

def postSignup(request):
    data = json.loads(request.body)
    form = SignupForm(data)
    if form.is_valid():
        form.save()
        return JsonResponse({"success": "true", "message": "user created successfuly"}, status=200)
    else:
        errors = {field: form.errors[field][0] for field in form.errors}
        return JsonResponse({"success": "false", "message": "the form is invalid", "errors":errors}, status=400)

def signup(request):
    if request.user.is_authenticated:
        return redirect('/')
    match request.method:
        case "GET":
            return getSignup(request)
        case "POST":
            return postSignup(request)

#@login_required(login_url="/login")
def getSettings(request):
    form = ChangeProfile(initial={
        'username': request.user.username,
        'email': request.user.email,
        'firstName': request.user.first_name,
        'lastName': request.user.last_name,
    })
    context = {
        "form": form,
        "content": "settings.html"
    }
    return render(request, 'index.html', context)

def putSettings(request):
    data = json.loads(request.body)
    form = ChangeProfile(data)
    if form.is_valid():
        passwordValidation, response = form.isPasswordValid(request.user)
        if passwordValidation == True:
            form.save(request.user)
            print("Update successful")
            user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password1'])
            login(request, user)
        return response
    else:
        errors = {field: form.errors[field][0] for field in form.errors}
        return JsonResponse({"message": "Failed to update profile", "errors": errors}, status=400)

def settings(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    if request.user.is_login == False:
        setOffline(user=request.user)
        logout(request)
        return redirect('/login')
    match request.method:
        case "GET":
            return getSettings(request)
        case "PUT":
            return putSettings(request)


def processMatch(match, userName):
    match["score"] = str(match["teams"][0]["score"])
    match["score"] += "-"
    match["score"] += str(match["teams"][1]["score"])
    for team in match["teams"]:
        for player in team["players"]:
            if (player["name"] == userName):
                for opponentTeam in match["teams"]:
                    if opponentTeam != team:
                        match["opponentTeam"] = opponentTeam
                        match["myTeam"] = team
                        if opponentTeam["score"] > team["score"]:
                            match["win"] = False
                        else:
                            match["win"] = True
                        return match

def calculateStats(matches):
    stats = {
        "totalGames": 0,
        "totalWins": 0,
        "totalLooses": 0,
        "totalPointsScored": 0,
        "totalPointsConceeded": 0
    }
    for match in matches:
        stats["totalGames"] += 1
        try:
            if match["win"]:
                stats["totalWins"] += 1
            else:
                stats["totalLooses"] += 1
            stats["totalPointsScored"] += match["myTeam"]["score"]
            stats["totalPointsConceeded"] += match["opponentTeam"]["score"]
        except KeyError:
            pass
    return stats

lastGames = [
    {
        "id": 0,
        "date":"2-2-2024",
        "teams": [
            {
                "id": 0,
                "score": 3,
                "players": [
                    {"name": "Carlos", "avatarPic": ""},
                    {"name": "Lucas", "avatarPic": ""}
                ]
            },
            {
                "id": 1,
                "score": 5,
                "players": [
                    {"name": "andrferr", "avatarPic": ""},
                    {"name": "Hans", "avatarPic": ""}
                ]
            }
        ]
    },
    {
        "id": 2,
        "date":"2-3-2024",
        "teams": [
            {
                "id": 0,
                "score": 4,
                "players": [
                    {"name": "Carlos", "avatarPic": ""},
                    {"name": "Lucas", "avatarPic": ""}
                ]
            },
            {
                "id": 1,
                "score": 2,
                "players": [
                    {"name": "andrferr", "avatarPic": ""},
                    {"name": "Hans", "avatarPic": ""}
                ]
            }
        ]
    },
]
