from .userInterface import dashboard
from django.shortcuts import render
import urllib.parse
from os import getenv
from .utils import setOnline, getTextsForLanguage
from api.translations.translation import pages

def index(request):
    error = request.session.get("error_42")
    if (request.user.is_authenticated) and (error == None):
        setOnline(user=request.user)
        return dashboard(request)
    uid = getenv('UID')
    encodedCallback = urllib.parse.quote(getenv('REDIRECT_URI'), safe='')
    language = request.session.get("lang")
    if (language is not "eng") and (language is not "fin") and (language is not "swe"):
        request.session["lang"] = "eng"
    if error is not None:
        errorString = error
        request.session["error_42"] = None
        error_flag = request.session.get("error_42_flag")
        if error_flag is None:
            request.session["error_42_flag"] = "1"
            request.session["error_42"] = errorString
        else:
            request.session["error_42_flag"] = None
            request.session["error_42"] = None
    else:
        errorString = ""
    context = {
        "content": "main.html",
        "url42" : "https://api.intra.42.fr/oauth/authorize?client_id=" + uid + "&redirect_uri=" + encodedCallback + "&response_type=code",
        "error" : errorString,
        "texts": getTextsForLanguage(pages["main"], request)
    }
    return render(request, "index.html", context)
