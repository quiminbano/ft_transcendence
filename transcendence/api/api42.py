from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from .models import Database
from os import getenv
import json
import http.client
import urllib.parse

#==========================================
#         GET COALITION
#==========================================

def getCoalition(id, header, connection):
    connection.request("GET", ('/v2/users/' + str(id) + '/coalitions'), headers=header)
    response = connection.getresponse()
    if response.status != 200:
        print('ERROR')
        coalition = ""
        errorFlag = 1
    else:
        bruteData = response.read()
        coalitionData = json.loads(bruteData)
        coalition = coalitionData[0]['name']
        errorFlag = 0
    return (coalition, errorFlag)

#==========================================
#         GET INFORMATION
#==========================================

def getInfo(token, expirationTime, refreshToken, destination, request):
    connection = http.client.HTTPSConnection('api.intra.42.fr')
    message = "Bearer " + token
    header = {'Authorization': message}
    connection.request("GET", '/v2/me', headers=header)
    response = connection.getresponse()
    if response.status != 200:
        print('ERROR')
        return redirect('/')
    bruteData = response.read()
    jsonData = json.loads(bruteData)
    loginUser = jsonData['login']
    firstName = jsonData['first_name']
    lastName = jsonData['last_name']
    email = jsonData['email']
    imagePath = jsonData['image']['versions']['small']
    id = jsonData['id']
    coalition, errorFlag = getCoalition(id=id, header=header, connection=connection)
    if errorFlag == 1:
        return redirect('/')
    try:
        user42 = Database.objects.filter(username=loginUser).get()
    except Database.DoesNotExist:
        user42 = Database.objects.create_user(login, email, getenv('PASSWORD_42'))
        user42.username = loginUser
        user42.is42 = True
        user42.coallition = coalition
        user42.first_name = firstName
        user42.last_name = lastName
        user42.avatarImage = None
        user42.full_clean()
        user42.save()
    if user42.is42 == True:
        user42.accessToken = token
        user42.refreshToken = refreshToken
        user42.expirationTime = expirationTime
        user42.full_clean()
        user42.save()
        auth = authenticate(request, username=loginUser, password=getenv('PASSWORD_42'))
        login(request, auth)
        return redirect(destination)
    return redirect('/') #This should handle a case where a regular user is using already the login of 42 user.


#==========================================
#         GET TOKEN
#==========================================

def getTokens(code, type, destination, request):
    connection = http.client.HTTPSConnection('api.intra.42.fr')
    uid = getenv('UID')
    secretKey = getenv('SECRET_KEY')
    uri = getenv('REDIRECT_URI')
    header = {'Content-Type': 'application/x-www-form-urlencoded',}
    body = urllib.parse.urlencode({'grant_type': type,
                                'client_id': uid,
                                'client_secret': secretKey,
                                'code': code,
                                'redirect_uri': uri,})
    connection.request("POST", "/oauth/token", body=body, headers=header)
    response = connection.getresponse()
    bruteData = response.read()
    if response.status == 200:
        token = json.loads(bruteData).get('access_token')
        expirationTime = json.loads(bruteData).get('created_at') + json.loads(bruteData).get('expires_in')
        refreshToken = json.loads(bruteData).get('refresh_token')
    else:
        print('ERROR') #Handle in the future with Andre.
    return getInfo(token, expirationTime, refreshToken, destination, request)

#==========================================
#         42 CALLBACK
#==========================================

def callback42(request):
    if request.user.is_authenticated:
        redirect('/login')
    code = request.GET.get('code') #if the callback was called successfully, we check if the code was sent to 42 to require the authentication token in the future.
    if code != None:
        return getTokens(code, 'authorization_code', '/dashboard', request) #if the code was sent by 42, we call the function getToken to request the access token.
    else:
        return redirect('/') #if there is no token, we redirect the user to the main page. I guess this can be improved.
