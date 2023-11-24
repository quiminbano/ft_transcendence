from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import SignupForm, LoginForm
from django.http import JsonResponse
import json

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
               print("Entering the function")
               login(request, user)
               return JsonResponse({"success": "true", "message": "Login completed successfuly", "status": "200"})
            else:
               return JsonResponse({"success": "false", "message": "Invalid credentials", "status": "400"})
        else:
            return JsonResponse({"success": "false", "message": "the form is invalid", "status": "400"})
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = SignupForm()
    return render(request, 'signup.html', {'form': form})


