from .userInterface import loginUser
from django.shortcuts import render
import urllib.parse
from os import getenv

def index(request):
    if request.user.is_authenticated:
        return loginUser(request)
    else:
        uid = getenv('UID')
        encodedCallback = urllib.parse.quote(getenv('REDIRECT_URI'), safe='')
        context = {
            "content": "main.html",
            "url42" : "https://api.intra.42.fr/oauth/authorize?client_id=" + uid + "&redirect_uri=" + encodedCallback + "&response_type=code"
        }
        return render(request, "index.html", context)
