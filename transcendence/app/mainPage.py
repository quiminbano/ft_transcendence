from .userInterface import loginUser
from django.shortcuts import render

def index(request):
    if request.user.is_authenticated:
        return loginUser(request)
    else:
        context = {
            "content": "main.html"
        }
        return render(request, "index.html", context)
