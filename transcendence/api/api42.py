from django.contrib.auth import authenticate, login, logout
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import QueryDict, JsonResponse
from django.shortcuts import redirect, render
from django.utils.datastructures import MultiValueDict
from app.utils import setOffline
from .models import Database, Users42
from app.forms import password42
from app.forms import ProfilePicture
from os import getenv
import json
import io
import mimetypes
import http.client
import urllib.parse

#==========================================
#     GET IMAGE AND ADD TO DATABASE
#==========================================

def processImage(userModel : Database, imagePath : str):
    mime = mimetypes.guess_type(imagePath)[0]
    fileName = imagePath.split("/")[-1]
    url = imagePath[23:]
    qdict = QueryDict('')
    connection = http.client.HTTPSConnection('cdn.intra.42.fr')
    connection.request("GET", url)
    response = connection.getresponse()
    if response.status != 200:
        userModel.avatar_image = None
        return None
    data = response.read()
    imageBytes = io.BytesIO(data)
    file = InMemoryUploadedFile(imageBytes, None, fileName, mime, len(data), None)
    body = MultiValueDict()
    body.setlist('avatar_image', [file])
    form = ProfilePicture(qdict, body)
    if form.is_valid():
        form.save(userModel=userModel)
    else:
        userModel.avatar_image = None
    return None

#==========================================
#         GET COALITION
#==========================================

def getCoalition(id, token):
    connection = http.client.HTTPSConnection('api.intra.42.fr')
    message = "Bearer " + token
    header = {'Authorization': message}
    connection.request("GET", ('/v2/users/' + str(id) + '/coalitions'), headers=header)
    response = connection.getresponse()
    if response.status != 200:
        coalition = ""
        errorFlag = 1
    else:
        bruteData = response.read()
        coalitionData = json.loads(bruteData)
        coalition = coalitionData[0]['name']
        errorFlag = 0
    return (coalition, errorFlag)

#==========================================
#         GET PROPER LOGIN USER
#==========================================

def storeIn42(loginUser):
    i = 1
    try:
        userIn42 = Users42.objects.filter(user_in_42=loginUser).get()
        tempUser = userIn42.user_in_database
        if userIn42.has_password:
            return tempUser
        userIn42.delete()
    except Users42.DoesNotExist:
        pass
    try:
        while True:
            if i == 1:
                tempUser = loginUser
            else:
                tempUser = loginUser + str(i)
            databaseUser = Database.objects.filter(username=tempUser).get()
            i += 1
    except Database.DoesNotExist:
        pass
    newUser = Users42(user_in_42=loginUser, user_in_database=tempUser)
    newUser.full_clean()
    newUser.save()
    return tempUser

#==========================================================================
#   FINISH CREATING THE 42 USER IF USER DEFINES A VALID PASSWORD
#==========================================================================
def postGetRestInfo(request, data):
    passwordData = json.loads(request.body)
    form = password42(passwordData)
    if not form.is_valid():
        errors = {field: form.errors[field][0] for field in form.errors}
        return JsonResponse({"success": "false", "message": "the form is invalid", "errors":errors}, status=400)
    token = data['access_token']
    refresh_token = data['refresh_token']
    expiration_time = data['expiration_time']
    destination = data['destination']
    jsonData = data['body_42']
    loginUser = data['loginUser']
    firstName = jsonData['first_name']
    lastName = jsonData['last_name']
    email = jsonData['email']
    imagePath = jsonData['image']['versions']['small']
    id = jsonData['id']
    password = form.cleaned_data['password1']
    coalition, errorFlag = getCoalition(id=id, token=token)
    if errorFlag == 1:
        return JsonResponse({"success": "false", "message": "coalition fetching failed", "errors": {"password2": "Fetching coalition failed"}}, status=400)
    user42 = Database.objects.create_user(loginUser, email, password)
    user42.username = loginUser
    user42.is_42 = True
    user42.is_login = True
    user42.coallition = coalition
    user42.first_name = firstName
    user42.last_name = lastName
    processImage(user42, imagePath)
    user42.access_token = token
    user42.refresh_token = refresh_token
    user42.expiration_time = expiration_time
    user42.online_status = True
    user42.full_clean()
    user42.save()
    auth = authenticate(request, username=loginUser, password=password)
    login(request, auth)
    request.session["data"] = None
    try:
        instance_42 = Users42.objects.filter(user_in_database=loginUser).get()
    except Users42.DoesNotExist:
        return JsonResponse({"success": "false", "message": "Undefined error", "errors": {"password2": "Undefined error"}}, status=400)
    instance_42.has_password = True
    instance_42.full_clean()
    instance_42.save()
    return JsonResponse({"success": "true", "message": "success", "destination": destination}, status=200)

#==========================================================================
#   DELETE THE USER FROM 42 TABLE IF USER CANCELS THE PASSWORD CREATION
#==========================================================================
def deleteGetRestInfo(request, data):
    jsonData = data['body_42']
    loginUser = jsonData['login']
    try:
        user42 = Users42.objects.filter(user_in_42=loginUser).get()
        user42.delete()
    except Users42.DoesNotExist:
        return JsonResponse({"success": "false", "message": "Delete failed"}, status=400)
    return JsonResponse({"success": "true", "message": "Deleted successfuly"}, status=200)

#=======================================================
#   GET THE REST OF THE INFO AFTER SETTING A PASSWORD
#=======================================================
def getRestInfo(request):
    if request.user.is_authenticated:
        return redirect('/')
    data = request.session.get("data")
    if data == None:
        return redirect('/')
    match request.method:
        case "POST":
            return postGetRestInfo(request, data)
        case "DELETE":
            return deleteGetRestInfo(request, data)
        case "GET":
            form = password42()
            context = {
                "form": form,
                "content": "set42password.html",
                "data": data
            }
            return  render(request, "index.html", context)
        case _:
            return JsonResponse({'error': 'Bad request'}, status=400)

#==================================================
#   GET LOGIN AND SEND REQUEST TO SET PASSWORD
#==================================================

def getLogin(token, expiration_time, refresh_token, destination, request):
    connection = http.client.HTTPSConnection('api.intra.42.fr')
    message = "Bearer " + token
    header = {'Authorization': message}
    connection.request("GET", '/v2/me', headers=header)
    response = connection.getresponse()
    if response.status != 200:
        return redirect('/login')
    bruteData = response.read()
    jsonData = json.loads(bruteData)
    loginUser = jsonData['login']
    loginUser = storeIn42(loginUser)
    try:
        user42 = Database.objects.filter(username=loginUser).get()
    except Database.DoesNotExist:
        context = {
            "body_42": jsonData,
            "loginUser": loginUser,
            "content": "set42password.html",
            "access_token": token,
            "refresh_token": refresh_token,
            "expiration_time": expiration_time,
            "destination": destination
        }
        request.session["data"] = context
        return redirect("/api/getRestInfo")
    if user42.is_42 == True:
        user42.access_token = token
        user42.refresh_token = refresh_token
        user42.expiration_time = expiration_time
        user42.is_login = True
        user42.online_status = True
        user42.full_clean()
        user42.save()
        login(request, user42)
        return redirect(destination)
    return redirect('/') #This should handle a case where a regular user is using already the login of 42 user.


#==========================================
#         GET TOKEN
#==========================================

def getTokens(code, type, typeCode, destination, request):
    connection = http.client.HTTPSConnection('api.intra.42.fr')
    uid = getenv('UID')
    secretKey = getenv('SECRET_KEY')
    uri = getenv('REDIRECT_URI')
    header = {'Content-Type': 'application/x-www-form-urlencoded',}
    body = urllib.parse.urlencode({'grant_type': type,
                                'client_id': uid,
                                'client_secret': secretKey,
                                typeCode: code,
                                'redirect_uri': uri,})
    connection.request("POST", "/oauth/token", body=body, headers=header)
    response = connection.getresponse()
    bruteData = response.read()
    if response.status == 200:
        token = json.loads(bruteData).get('access_token')
        expiration_time = json.loads(bruteData).get('created_at') + json.loads(bruteData).get('expires_in')
        refresh_token = json.loads(bruteData).get('refresh_token')
        return getLogin(token, expiration_time, refresh_token, destination, request)
    if typeCode == 'code':
        request.session["error_42"] = "Authentication with 42 failed"
    else:
        request.session["error_42"] = "Your session with 42 is expired. Please login again"
        request.user.is_login = False
        setOffline(request.user)
        logout(request)
    return redirect('/')
        



#==========================================
#         42 CALLBACK
#==========================================

def callback42(request):
    if request.user.is_authenticated:
        redirect('/')
    code = request.GET.get('code') #if the callback was called successfully, we check if the code was sent to 42 to require the authentication token in the future.
    if code != None:
        return getTokens(code, 'authorization_code', 'code', '/', request) #if the code was sent by 42, we call the function getToken to request the access token.
    else:
        request.session["error_42"] = "Authentication with 42 failed"
        return redirect('/') #if there is no code, we redirect the user to the main page. I guess this can be improved.
