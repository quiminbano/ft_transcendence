
# ft_transcendence

<p align="center">
  <img src="https://auth.42.fr/auth/resources/0nmse/login/students/img/42_logo.svg" width="120" alt="42 Logo" /></a>
</p>
  
<p align="center">PONG TOURNAMENT</p>
<p align="center">André - Carlos - Hans - João - Lucas</p>

## Table of Contents
- [Introduction](#Introduction)
- [Setup](#Setup)
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


## Introduction <a name="Introduction"></a>
This project is created by using vanilla JavaScript for the SPA frontend and Python with Django on Apache/WSGI as backend.

## Setup <a name="Setup"></a>
In order to run the poject you need:
1. Docker
2. Docker Compose v2.x.x
3. A .env file in the root of the project with following variables (fill in whatever value you want):
    - POSTGRES_USER=""
    - POSTGRES_PASS=""
    - POSTGRES_DB=""
    - DJANGO_SUPERUSER=""
    - DJANGO_SUPERUSER_EMAIL=""
    - DJANGO_SUPERUSER_PASS=""
    - DJANGO_SECRET_KEY=""
    - PASSWORD_42=""
    - UID=""
    - SECRET_KEY=""
    - REDIRECT_URI=""

After you have done this you can simply run ***make***.

### Database Model <a name="Database-M"></a> 
This is the user table.
| Name | Type | Description |
| ------ | ------ | ------ |
| username              | Django-Builtin        | The identifier of the user.                       |
| online_status         | BooleanField          | Is the user currently online                      |
| is42                  | BooleanField          | Has the user registered through their 42 account  |
| friends               | ManyToManyField       | All the friends of the user.                      |
| friend_requests       | ManyToManyField       | All pending friend requests.                      |
| coallition            | CharField             | The player's 42 coallition                        |
| avatar_image          | FileField             | The path to the image of the user.                |
| tournament            | OneToOneField         | Link to user's current hosted tournament.         |
| objects               | CustomUserManager()   | Django required implementation.                   |
| get_coallition(self)  | Function              | Returns the user's coallition.                    |
| \_\_str\_\_(self)     | Function              | Returns the username of the user.                 |


### Tournament Model <a name="Tournament-M"></a>
| Name | Type | Description |
| ------ | ------ | ------ |
| STATE_CHOICES     | List of tuples    | List of possible states.      |
| id                | AutoField         | Identifier of the tournament. |
| uuid              | UUIDField         | Identifier of the host user.  |
| tournament_name   | CharField         | Name of the tournament        |
| amount            | IntegerField      | Max amount of layers allowed. |
| state             | CharField         | The state of the tournament.  |
| players           | ManyToManyField   | The current player aliases.   |

### Tournament API <a name="Tournament"></a>
| HTTP Method | Endpoint | Description |
| ------ | ------ | ------ |
| GET       | /api/tournament           | Gets the tournament of the authenticated user         |
| POST      | /api/tournament           | Creates a new tournament for the authenticated user   |
| DELETE    | /api/tournament           | Deletes the tournament of the authenticated user      |
| GET       | /api/tournament/:id       | Gets a tournament by ID                               |
| POST      | /api/tournament/:id       | Creates a new player on that tournament ID            |
| DELETE    | /api/tournament/:id       | Deletes the tournament that has the specific ID       |
| PUT       | api/tournament/player/:id | Updates a tournamentUser by ID                        |
| DELETE    | api/tournament/player/:id | Deletes a tournamentUser by ID                        |



### Database API <a name="Database"></a>
| HTTP Method | Endpoint | Description |
| ------ | ------ | ------ |
| POST		| /api/userProfilePicture           | Uploads the user's profile picture.                                   |
| GET		| /api/friends                      | Returns all the friends of the logged in user.                        |
| GET		| /api/searchUsers/:search          | Returns summary info about all the users matching the search query.   |
| GET		| /api/users                        | Returns info about the logged in user.                                |
| DELETE	| /api/users                        | Deletes the logged in user.                                           |
| GET		| /api/users/:userName              | Returns all the info about the specific user.                         |
| POST		| /api/friendRequest/:friendName    | Sends friend request to friendName.                                   |
| DELETE	| /api/friendRequest/:friendName    | Remove friend request from friendName.                                |
| POST		| /api/friend/:friendName           | Accepts friend request if there is one.                               |
| DELETE	| /api/friend/:friendName           | Removes friend from friend list.                                      |
