from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile
from django.core.files import File
import os
import mimetypes

def defineNameImage(model, filename):
    extension = os.path.splitext(filename)[1]
    return f"user_{model.uuid}{extension}"

def validationImageSize(image):
    if isinstance(image, UploadedFile) or isinstance(image, File):
        fileSize = image.size
        limitedSizeInMb = 1
        if (fileSize > (limitedSizeInMb * 1024 * 1024)):
            raise ValidationError("The max size of the file must be 1 MB for the image!")
    else:
        pass
    
def validateFileType(image):
    mimeList = ['image/jpeg', 'image/png']
    if isinstance(image, UploadedFile):
        fileType = image.content_type
    elif isinstance(image, File):
        fileType = mimetypes.guess_type(image.name)[0]
    else:
        pass

    if fileType not in mimeList:
        raise ValidationError("Unsupported file type for the image!")
