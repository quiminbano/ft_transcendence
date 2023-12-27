from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from .forms import SignupForm, LoginForm, ChangeProfile, ProfilePicture
from django.http import JsonResponse
from .utils import stringifyImage
import json

#@login_required(login_url="/login")
def dashboard(request):
    if not request.user.is_authenticated:
        return loginUser(request)
    coallition = request.user.get_coallition()
    form = ProfilePicture()
    source = stringifyImage(request.user)
    context = { "content": "dashboard.html", "coallition": coallition, "form" : form, "source" : source}
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
        user = authenticate(request, username=username, password=password)
        if user:
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
        return dashboard(request)
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
    print("Comimg here")
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
       return loginUser(request)
    match request.method:
        case "GET":
            return getSettings(request)
        case "PUT":
            return putSettings(request)
