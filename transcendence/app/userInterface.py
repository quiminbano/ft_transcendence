from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from .forms import SignupForm, LoginForm, ChangeProfile, ProfilePicture
from django.http import JsonResponse
from .utils import stringifyImage, setOffline, setOnline, getTextsForLanguage
from api.userController import getUser
from api.api42 import getTokens
import json
import time
from api.translations.translation import pages

#@login_required(login_url="/login")
def dashboard(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    if request.user.is_login == False:
        setOffline(user=request.user)
        logout(request)
        return redirect('/login')
    if (request.user.is_42 == True) and (time.time() > request.user.expiration_time):
        return getTokens(request.user.refresh_token, 'refresh_token', 'refresh_token', request.path, request)
    coallition = request.user.coallition
    form = ProfilePicture()
    source = stringifyImage(request.user)
    expectedUser = getUser(request, request.user.username)
    if expectedUser == None:
        return redirect("/404")
    data = json.loads(expectedUser.content.decode())
    matchesList = data["completed_matches"]
    matches = matchesList.copy()
    for match in matches:
        match = processUserMatch(match, request.user.username)
    reversedMatches = matches[::-1]
    stats = setStats(data)
    context = {
        "content": "dashboard.html",
        "coallition": coallition,
        "form" : form,
        "source" : source,
        "lastGames": reversedMatches,
        "stats": stats,
        "menus": getTextsForLanguage(pages["menus"], request),
        "dashboardTexts": getTextsForLanguage(pages["dashboard"], request),
        "gamesTexts": getTextsForLanguage(pages["games"], request),
        "invitationsTexts": getTextsForLanguage(pages["invitations"], request),
        "language": request.user.prefered_language
        }
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
    if (request.user.is_42 == True) and (time.time() > request.user.expiration_time):
        return getTokens(request.user.refresh_token, 'refresh_token', 'refresh_token', request.path, request)
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
    matchesList = data["completed_matches"]
    matches = matchesList.copy()
    #TODO: change this data to the real user data!!!!!!!!!
    for match in matches:
        match = processUserMatch(match, name)
    reversedMatches = matches[::-1]
    info = {
        "username": name,
        "online": data["online_status"],
        "isFriend": getFriendState(request, data["friend_requests"], data["friends"]),
        "coallition": data["coallition"],
        "picture": data["avatar_image"]
    }
    stats = setStats(data)
    client = {
        "info": info,
        "stats": stats,
        "lastGames": reversedMatches
    }
    gamesTexts = getTextsForLanguage(pages["games"], request)
    usersPage = getTextsForLanguage(pages["usersPage"], request)
    context = {
        "content": "usersPage.html",
        "source": source,
        "client": client,
        "gamesTexts": gamesTexts,
        "usersPage": usersPage,
        "dashboardTexts": getTextsForLanguage(pages["dashboard"], request),
    }
    return render(request, "index.html", context)

def getLoginUser(request, language):
    form = LoginForm()
    context = {
        "form": form,
        "content": "login.html",
        "texts": getTextsForLanguage(pages["login"], request)
    }
    return render(request, 'index.html', context)

def postLoginUser(request, language):
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
        return redirect('/')
    language = request.session.get('lang')
    if (language is None) or ((language != "eng") and (language != "fin") and (language != "swe")):
        request.session['lang'] = 'eng'
    match request.method:
        case "GET":
            return getLoginUser(request, language)
        case "POST":
            return postLoginUser(request, language)

def logoutUser(request):
    request.user.is_login = False
    setOffline(user=request.user)
    logout(request)
    return JsonResponse({"success": "true", "message": "logout succeeded"}, status=200)

def getSignup(request, language):
    form = SignupForm()
    context = {
        "form": form,
        "content": "signup.html",
        "texts": getTextsForLanguage(pages["signup"], request)
    }
    return render(request, 'index.html', context)

def postSignup(request, language):
    data = json.loads(request.body)
    form = SignupForm(data)
    if form.is_valid():
        form.save()
        return JsonResponse({"success": "true", "message": "user created successfuly"}, status=200)
    else:
        errors = {field: form.errors[field][0] for field in form.errors}
        return JsonResponse({"success": "false", "message": "the form is invalid", "errors":errors}, status=400)

def signup(request):
    language = request.session.get('lang')
    if (language is None) or ((language != "eng") and (language != "fin") and (language != "swe")):
        request.session['lang'] = 'eng'
    if request.user.is_authenticated:
        return redirect('/')
    match request.method:
        case "GET":
            return getSignup(request, language)
        case "POST":
            return postSignup(request, language)

#@login_required(login_url="/login")
def getSettings(request):
    form = ChangeProfile(initial={
        'username': request.user.username,
        'email': request.user.email,
        'firstName': request.user.first_name,
        'lastName': request.user.last_name,
        'language': request.user.prefered_language,
    })
    context = {
        "form": form,
        "content": "settings.html"
    }
    return render(request, 'index.html', context)

def putSettings(request):
    data = json.loads(request.body)
    form = ChangeProfile(data)
    if not form.is_valid():
        errors = {field: form.errors[field][0] for field in form.errors}
        return JsonResponse({"message": "Failed to update profile", "errors": errors}, status=400)
    passwordValidation, response = form.isPasswordValid(request.user)
    if not passwordValidation:
        return response
    flag, reason = form.save(request.user)
    if not flag:
        return JsonResponse({"message": "Failed to update profile", "errors": reason}, status=400)
    user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password1'])
    login(request, user)
    return response

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

def processUserMatch(match, userName):
    match["score"] = str(match["teamOne"]["score"]) + "-" + str(match["teamTwo"]["score"])
    for player in match["teamOne"]["players"]:
        if player["username"] == userName:
            match["myTeam"] = match["teamOne"]
            match["opponentTeam"] = match["teamTwo"]
            return match
    for player in match["teamTwo"]["players"]:
        if player["username"] == userName:
            match["myTeam"] = match["teamTwo"]
            match["opponentTeam"] = match["teamOne"]
            return match

def setStats(stats):
    stats["totalGames"] = stats["matches_played"]
    stats["totalWins"] = stats["matches_won"]
    stats["totalLooses"] = stats["matches_played"] - stats["matches_won"]
    stats["totalPointsScored"] = stats["total_points_scored"]
    stats["totalPointsConceeded"] = stats["total_points_conceded"]
    stats["totalTournaments"] = stats["tournaments_played"]
    stats["totalTournamentsWon"] = stats["tournaments_won"]
    return stats
