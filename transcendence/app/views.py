from django.shortcuts import render

def status_404(request):
    context = {}
    return render(request, "404.html", context)

def index(request):
    context = {}
    return render(request, "index.html", context)

def main(request):
    context = {}
    return render(request, "main.html", context)

def login(request):
    context = {}
    return render(request, "login.html", context)
