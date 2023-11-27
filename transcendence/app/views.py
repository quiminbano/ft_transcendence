from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import SignupForm, LoginForm
from django.http import JsonResponse
import json


def get_template(request, route):
    template_path = route + ".html"
    print(template_path)
    if route == "login":
        return loginUser(request)
    elif route == "signup":
        return signup(request)
    else:
        return render(request, template_path)

def status_404(request):
    context = {}
    return render(request, "404.html", context)

def index(request):
    context = {}
    return render(request, "index.html", context)

def main(request):
    context = {}
    return render(request, "main.html", context)

def loginUser(request):
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
    return render(request, 'login.html', {'form': form})

def logoutUser(request):
    print("Logout function called")
    logout(request)
    return JsonResponse({"success": "true", "message": "logout succeeded"}, status=200)

def signup(request):
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
    return render(request, 'signup.html', {'form': form})

@login_required(login_url="/login")
def dashboard(request):
    if request.user.is_authenticated:
        print("USer is authenticated!")
    else:
        print("User is not authenticated!!")
    context = {}
    return render(request, "dashboard.html", context)


