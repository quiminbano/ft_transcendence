

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
        - [Match Model](#Match-M) 
        - [Team Model](#Team-M) 
    - [Endpoints](#Tournament)
        - [Tournament API](#Tournament)
        - [Tournament Player API](#Tournament-Player)
        - [Tournament Match API](#Tournament-Match)
        - [Database API](#Database)


## Introduction <a name="Introduction"></a>
This project uses vanilla JavaScript for the SPA front end and Python with Django on Apache/WSGI as the backend.

## Setup <a name="Setup"></a>
To run the project you need the following:
1. Docker
2. Docker Compose v2.x.x
3. A .env file in the root of the project with the following variables (fill in whatever value you want):
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
| is_login				| BooleanField          | Is the user currently online                      |
| is_42                 | BooleanField          | Has the user registered through their 42 account  |
| friends               | ManyToManyField       | All the friends of the user.                      |
| friend_requests       | ManyToManyField       | All pending friend requests.                      |
| coallition            | CharField             | The player's 42 coalition                        |
| access_token          | CharField             | ?                       |
| refresh_token         | CharField             | ?                       |
| expiration_time       | BigIntegerField       | ?                     |
| avatar_image          | FileField             | The path to the image of the user.                |
| tournament            | OneToOneField         | Link to user's current hosted tournament.         |
| completed_matches     | ManyToManyField       | all tournaments the user has participated in.     |
| matches_played        | IntegerField          |                        |
| matches_won           | IntegerField          |                        |
| matches_lost          | IntegerField          |                        |
| objects               | CustomUserManager()   | Django required implementation.                   |
| get_coallition(self)  | Function              | Returns the user's coallition.                    |
| \_\_str\_\_(self)     | Function              | Returns the username of the user.                 |


### Tournament Model <a name="Tournament-M"></a>
| Name | Type | Description |
| ------ | ------ | ------ |
| id                | AutoField         | Identifier of the tournament. |
| tournament_name   | CharField         | Name of the tournament        |
| player_amount     | IntegerField      | Max amount of layers allowed. |
| players           | ManyToManyField   | The current player aliases.   |
| completed         | BooleanField      |  |
| winner         	| CharField      	|  |
| matches         	| ManyToManyField   | a link between all the matches within the tournament. |

### Match Model <a name="Match-M"></a>
| Name | Type | Description |
| ------ | ------ | ------ |
| id                | AutoField         | Identifier of the Match. |
| team1             | OneToOneField         | link to team one. |
| team2             | OneToOneField         | link to team two. |
| date	            | DateField         |  |

### Team Model <a name="Team-M"></a>
| Name | Type | Description |
| ------ | ------ | ------ |
| id                | AutoField         | Identifier of the Team. |
| score             | AutoField         | score of the team. |
| players           | AutoField         | link to all the players in the team. |


### Tournament API <a name="Tournament"></a>
| HTTP Method | Endpoint | Description |
| ------ | ------ | ------ |
| GET       | /api/tournament           | Gets the tournament of the authenticated user         |
| POST      | /api/tournament           | Creates a new tournament for the authenticated user   |
| DELETE    | /api/tournament           | Deletes the tournament of the authenticated user      |
| GET       | /api/tournament/:id       | Gets a tournament by ID                               |
| DELETE    | /api/tournament/:id       | Deletes the tournament that has the specific ID       |


### Tournament Player API <a name="Tournament-Player"></a>
| HTTP Method | Endpoint | Description |
| ------ | ------ | ------ |
| POST 		| /api/tournament/:id/player | Adds the user provided in the body to the tournament ID.  |
| DELETE	| /api/tournament/:id/player | Removes the user provided in the body from the tournament ID. |


### Tournament Match API <a name="Tournament-Match"></a>
| HTTP Method | Endpoint | Description |
| ------ | ------ | ------ |
| POST      | /api/tournament/:id/match       | Adds the match provided in the body to that tournament ID.|

### Database API <a name="Database"></a>
| HTTP Method | Endpoint | Description |
| ------ | ------ | ------ |
| POST		| /api/userProfilePicture           | Uploads the user's profile picture.                                   |
| GET		| /api/friends                      | Returns all the friends of the logged-in user.                        |
| GET		| /api/searchUsers/:search          | Returns summary info about all the users matching the search query.   |
| GET		| /api/users                        | Returns info about the logged-in user.                                |
| DELETE	| /api/users                        | Deletes the logged in user.                                           |
| GET		| /api/users/:userName              | Returns all the info about the specific user.                         |
| POST		| /api/friendRequest/:friendName    | Sends friend request to friendName.                                   |
| DELETE	| /api/friendRequest/:friendName    | Remove friend request from friendName.                                |
| POST		| /api/friend/:friendName           | Accepts friend request if there is one.                               |
| DELETE	| /api/friend/:friendName           | Removes friend from friend list.                                      |
