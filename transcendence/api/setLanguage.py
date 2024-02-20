from django.shortcuts import redirect
import json

def	setLanguage(request):
    if request.method is not "POST":
        return redirect('/404')
    if not request.headers.get('flag'):
        return redirect('/404')
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return redirect('/404')
    try:
        language = data['lang']
    except KeyError:
        return redirect('/404')
    destination = request.headers.get('destination')
    if destination is None:
        return redirect('/404')
    match language:
        case "eng":
            request.session['lang'] = "eng"
        case "fin":
            request.session['lang'] = "fin"
        case "swe":
            request.session['lang'] = "swe"
        case _:
            request.session['lang'] = "eng"
    return redirect(destination)
