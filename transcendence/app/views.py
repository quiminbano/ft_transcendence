from django.shortcuts import render
from django.http import HttpResponse

def status_404(request):
    context = {}
    return render(request, "404.html", context)

def index(request):
    context = {}
    return render(request, "index.html", context)

<<<<<<< HEAD
def scores(request):
    context = {}
    return HttpResponse("Hello")
=======
def main(request):
    context = {}
    return render(request, "main.html", context)

def login(request):
    context = {}
    return render(request, "login.html", context)
>>>>>>> e3927fdde6b36f80ffc298d5c95857378feaa9ee
