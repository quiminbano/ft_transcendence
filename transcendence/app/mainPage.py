from .userInterface import dashboard
from django.shortcuts import render
import urllib.parse
from os import getenv
from .utils import setOnline

def index(request):
    if request.user.is_authenticated:
        setOnline(user=request.user)
        return dashboard(request)
    else:
        uid = getenv('UID')
        encodedCallback = urllib.parse.quote(getenv('REDIRECT_URI'), safe='')
        context = {
            "content": "main.html",
            "url42" : "https://api.intra.42.fr/oauth/authorize?client_id=" + uid + "&redirect_uri=" + encodedCallback + "&response_type=code"
        }
        return render(request, "index.html", context)
