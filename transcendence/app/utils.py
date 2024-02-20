import os
from api.models import Database
import base64

def	stringifyImage(model : Database):
    try:
        extension = os.path.splitext(model.avatar_image.url)[1]
        readFile = model.avatar_image.read()
        base64Image = base64.b64encode(readFile)
        decodedImage = base64Image.decode('utf-8')
        source = "data:image/" + extension[1:] + ";base64," + decodedImage
    except (FileNotFoundError, ValueError):
        source = "data:image/" + "png" + ";base64," + ""
        model.avatar_image = None
        model.save()
    return source

def setOnline(user : Database):
    user.online_status = True
    user.full_clean()
    user.save()

def setOffline(user : Database):
    user.online_status = False
    user.full_clean()
    user.save()

def getTextsForLanguage(dictionary, request):
    if request.user.is_authenticated:
        language = request.user.prefered_language
    else:
        language = request.session["lang"]
    texts_for_language = {key: value.get(language, '') for key, value in dictionary.items()}
    return texts_for_language

def getTextForm(dictionary, key, language):
    try:
        seccion = dictionary[key]
        translation = seccion[language]
    except KeyError:
        translation = None
    print(translation)
    return translation