from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from .forms import SignupForm, LoginForm, ChangeProfile
from django.http import JsonResponse
import json

def status_404(request):
    context = {}
    return render(request, "404.html", context)

def index(request):
    if request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {
            "content": "main.html"
        }
        return render(request, "index.html", context)

def loginUser(request):
    if request.user.is_authenticated:
        return dashboard(request)
    if request.method == 'POST':
        data = json.loads(request.body)
        form = LoginForm(data)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
               login(request, user)
               return JsonResponse({"success": "true", "message": "Login completed successfuly"}, status=200)
            else:
               return JsonResponse({"success": "false", "message": "Invalid credentials"}, status=400)
        else:
            return JsonResponse({"success": "false", "message": "the form is invalid"}, status=400)
    else:
        form = LoginForm()
    context = {
        "form": form,
        "content": "login.html"
    }
    return render(request, 'index.html', context)

def logoutUser(request):
    logout(request)
    return JsonResponse({"success": "true", "message": "logout succeeded"}, status=200)

def signup(request):
    if request.user.is_authenticated:
        return dashboard(request)
    if request.method == 'POST':
        data = json.loads(request.body)
        form = SignupForm(data)
        if form.is_valid():
            form.save()
            return JsonResponse({"success": "true", "message": "user created successfuly"}, status=200)
        else:
            errors = {field: form.errors[field][0] for field in form.errors}
            return JsonResponse({"success": "false", "message": "the form is invalid", "errors":errors}, status=400)
    else:
        form = SignupForm()
    context = {
        "form": form,
        "content": "signup.html"
    }
    return render(request, 'index.html', context)

#@login_required(login_url="/login")
def dashboard(request):
    if not request.user.is_authenticated:
        return loginUser(request)
    context = { "content": "dashboard.html"}
    return render(request, "index.html", context)

#@login_required(login_url="/login")
def settings(request):
    if not request.user.is_authenticated:
       return loginUser(request)
    if request.method == 'POST':
        data = json.loads(request.body)
        form = ChangeProfile(data)
        if form.is_valid():
            if form.isPasswordValid(request.user) == False:
                return JsonResponse({"success": "false", "message": "Failed to update profile"}, status=400)
            form.save(request.user)
            print("Update successful")
            user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password1'])
            login(request, user)
            return JsonResponse({"success": "true", "message": "profile updated successfuly"}, status=200)
        else:
            return JsonResponse({"success": "false", "message": "Failed to update profile"}, status=400)
    else:
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


def pong(request):
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "PongTournamentPages/pong.html"}
        return render(request, "index.html", context)
def pongOnevsOne(request):
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "PongTournamentPages/pongOneVsOne.html"}
        return render(request, "index.html", context)

def pongTournament(request):
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "PongTournamentPages/tournamentCreation.html"}
        return render(request, "index.html", context)

def pongTournamentLobby(request, id):
    #Make a check to see if there is a open tournament with the same id!!!
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "PongTournamentPages/pongTournament.html"}
        return render(request, "index.html", context)

def pongTournamentStart(request, id):
    #Make a check to see if there is a open tournament with the same id!!!
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "PongTournamentPages/tournamentStart.html"}
        return render(request, "index.html", context)

def getRegisterPlayersTemplate(request):
        return render(request, "registeredPlayers.html", {})

def getCircleChartTemplate(request):
        return render(request, "circleChart.html", {})

def getSearchItem(request):
        return render(request, "SearchElements/searchItem.html", {})
