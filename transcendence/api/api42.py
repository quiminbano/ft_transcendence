from django.shortcuts import redirect
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

def getInfo(token):
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
    login = jsonData['login']
    firstName = jsonData['first_name']
    lastName = jsonData['last_name']
    email = jsonData['email']
    imagePath = jsonData['image']['versions']['small']
    id = jsonData['id']
    print('This is login:', login, 'This is first name:' , firstName, 'This is last name:', lastName, 'This is email:', email, 'This is image path:', imagePath)
    coalition, errorFlag = getCoalition(id=id, header=header, connection=connection)
    if errorFlag == 1:
        return redirect('/')
    print('This is coalition:', coalition)
    return redirect('/')


#==========================================
#         GET TOKEN
#==========================================

def getToken(code):
    connection = http.client.HTTPSConnection('api.intra.42.fr')
    uid = getenv('UID')
    secretKey = getenv('SECRET_KEY')
    uri = getenv('REDIRECT_URI')
    header = {'Content-Type': 'application/x-www-form-urlencoded',}
    body = urllib.parse.urlencode({'grant_type': 'authorization_code',
                                'client_id': uid,
                                'client_secret': secretKey,
                                'code': code,
                                'redirect_uri': uri,})
    connection.request("POST", "/oauth/token", body=body, headers=header)
    response = connection.getresponse()
    bruteData = response.read()
    if response.status == 200:
        token = json.loads(bruteData).get('access_token')
        expiration_time = json.loads(bruteData).get('expires_in')
        refresh_token = json.loads(bruteData).get('refresh_token')
        print('This is access token:', token)
        print('This is expiration time:', expiration_time)
        print('This is the type of expiration time:', type(expiration_time))
        print('This is refresh token:', refresh_token)
    else:
        print('ERROR')
    return getInfo(token)

#==========================================
#         42 CALLBACK
#==========================================

def callback42(request):
    code = request.GET.get('code') #if the callback was called successfully, we check if the code was sent to 42 to require the authentication token in the future.
    if code != None:
        return getToken(code) #if the code was sent by 42, we call the function getToken to request the access token.
    else:
        return redirect('/') #if there is no token, we redirect the user to the main page. I guess this can be improved.
