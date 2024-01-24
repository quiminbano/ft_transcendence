
# ft_transcendence

<p align="center">
  <img src="https://auth.42.fr/auth/resources/0nmse/login/students/img/42_logo.svg" width="120" alt="42 Logo" /></a>
</p>
  
<p align="center">PONG TOURNAMENT</p>
<p align="center">André - Carlos - Hans - João - Lucas</p>

## Table of Contents
- [Introduction](#introduction)
- [set-up](#set-up)
- [APP](#APP)
	- [app.js](#app-js)
	- [router.js](#router-js)
- [API](#Database-M)
    - [Models](#Database-M)
        - [Database Model](#Database-M) 
        - [Tournament Model](#Tournament-M) 
    - [Endpoints](#Tournament)
        - [Tournament API](#Tournament)
        - [Database API](#Database)


## Introduction <a name="introduction"></a>
This project is craeted by using Vanilla Javascript and Djano as backend using Python

## set-up <a name="set-up"></a>
in order to run the poject you need
1. docker
2. dokceer compose v2
3. a .env fiile in the root of the project with following variables (fill in whatever value you want):
    POSTGRES_USER=""
    POSTGRES_PASS=""
    POSTGRES_DB=""
    POSTGRES_HOST=""
    DJANGO_SUPERUSER_EMAIL=""
    DJANGO_SUPERUSER_PASS=""
    DJANGO_SUPERUSER=""

after you have done this you can simply run ***make***.

### Database Model <a name="Database-M"></a> 
This is  the user table.
| Name | Type | Description |
| ------ | ------ | ------ |
| username | Django-Builtin | The identifier of the user. |
| onlineStatus | BooleanField |  |
| is42 | BooleanField | is it a 42 user. |
| friends | ManyToManyField | all the friends of the user. |
| friendRequests | ManyToManyField | all pending friend requests. |
| coallition | CharField |  |
| avatarImage | FileField | the path to the image of the user. |
| tournament | OneToOneField | Link to user's current hosted tournament. |
| objects | CustomUserManager() | Django required implementation. |
| get_coallition(self) | Function | Returns the coallition. |
| \_\_str\_\_(self) | Function | Returns the username of the user. |


### Tournament Model <a name="Tournament-M"></a>
| Name | Type | Description |
| ------ | ------ | ------ |
| STATE_CHOICES | list of tuples | list of possible states. |
| id | AutoField | Identifier of the tournament. |
| tournamentName | CharField |  |
| amount | IntegerField | Max amount of layer allowed. |
| sate | CharField | The sate of the tournament. |
| players | ManyToManyField | the current player aliases. |

### Tournament API <a name="Tournament"></a>
| HTTP Method | Endpoint | Description | Notes |
| ------ | ------ | ------ | ------ |
| GET       | /api/tournament           | Gets the tournament of the authenticated user         | returns the tournnament |
| POST      | /api/tournament           | Creates a new tournament for the authenticated user   | returns the tournnament |
| DELETE    | /api/tournament           | Deletes the tournament of the authenticated user      |  |
| GET       | /api/tournament/:id       | Gets a tournament by ID                               | returns the tournnament |
| POST      | /api/tournament/:id       | Creates a new player on that tournament ID            |  |
| DELETE    | /api/tournament/:id       | Deletes the tournament that has the specific ID       |  |
| PUT       | api/tournament/player/:id | Updates a tournamentUser by ID                        |  |
| DELETE    | api/tournament/player/:id | Deletes a tournamentUser by ID                        |  |



### Database API <a name="Database"></a>
| HTTP Method | Endpoint | Description | Notes |
| ------ | ------ | ------ | ------ |
| POST		| /api/userProfilePicture |  |  |
| GET		| /api/friends | returns all the friends of the logged in user. |  |
| GET		| /api/searchUsers/:search | return little info about all the users mathces the searched. |  |
| GET		| /api/users | returns info about the logged in user. |  |
| DELETE	| /api/users | deletes the logged in user. |  |
| GET		| /api/users/:userName | returns all the info about the specfic user. |  |
| POST		| /api/friendRequest/:friendName | sends friend request to friendName. |  |
| DELETE	| /api/friendRequest/:friendName | remove friend request to friendName. |  |
| POST		| /api/friend/:friendName | Accepts friends request if there is one. |  |
| DELETE	| /api/friend/:friendName | Removes friend from friend list. |  |
