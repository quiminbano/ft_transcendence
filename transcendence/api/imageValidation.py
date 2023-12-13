from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile
import os

def defineNameImage(model, filename):
    extension = os.path.splitext(filename)[1]
    return f"user_{model.uuid}{extension}"

def validationImageSize(image : UploadedFile):
    fileSize = image.size
    limitedSizeInMb = 1
    if (fileSize > (limitedSizeInMb * 1024 * 1024)):
        raise ValidationError("The max size of the file must be 1 MB for the image!")
    
def validateFileType(image : UploadedFile):
    mimeList = ['image/jpeg', 'image/png']
    fileType = image.content_type
    if fileType not in mimeList:
        raise ValidationError("Unsupported file type for the image!")