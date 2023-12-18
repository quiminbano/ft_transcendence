import os
from api.models import CustomUserData
import base64

def	stringifyImage(model : CustomUserData):
    imageFile = open("/app/api" + model.avatarImage.url, "rb")
    extension = os.path.splitext(model.avatarImage.url)[1]
    readFile = imageFile.read()
    base64Image = base64.b64encode(readFile)
    decodedImage = base64Image.decode('utf-8')
    source = "data:image/" + extension[1:] + ";base64," + decodedImage
    return source