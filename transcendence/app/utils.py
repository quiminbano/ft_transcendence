import os
from api.models import CustomUserData
import base64
from django.core.files.storage import default_storage

def	stringifyImage(model : CustomUserData):
    try:
        extension = os.path.splitext(model.avatarImage.url)[1]
        readFile = model.avatarImage.read()
        base64Image = base64.b64encode(readFile)
        decodedImage = base64Image.decode('utf-8')
        source = "data:image/" + extension[1:] + ";base64," + decodedImage
    except (FileNotFoundError, ValueError):
        source = "data:image/" + "png" + ";base64," + ""
        model.avatarImage = None
        model.save()
    return source