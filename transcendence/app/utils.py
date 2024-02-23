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

def swapErrors(errors, dictionary, language):
    if (language is None) or (language != "eng" and language != "fin" and language != "swe"):
        language = "eng"
    newErrors = {}
    for key, value in errors.items():
        try:
            if key == "validation":
                print(value)
            newErrors[key] = dictionary[key][value][language]
        except KeyError:
            newErrors[key] = dictionary[key]["Undefined error"][language]
    return newErrors
        

def getLanguage(request):
    if request.user.is_authenticated:
        return request.user.prefered_language
    else:
        return request.session.get("lang")
    