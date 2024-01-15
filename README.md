# ft_transcendence
## _The Last Markdown Editor, Ever_

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
- [API](#CustomUserData-M)
    - [Models](#CustomUserData-M)
        - [CustomUserData Model](#CustomUserData-M) 
        - [Tournament Model](#Tournament-M) 
    - [Endpoints](#Tournament)
        - [Tournament API](#Tournament)


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

### CustomUserData Model <a name="CustomUserData-M"></a>
| Name | Type | Description |
| ------ | ------ | ------ |
| uuid | UUIDField | The identifier of the user. |
| onlineStatus | BooleanField |  |
| friends | ManyToManyField | Field of self (CustomUserData). |
| coallition | CharField |  |
| avatarImage | FileField | ? |
| tournament | OneToOneField | Link to user's current hosted tournament. |
| objects | CustomUserManager() | Django required implementation. |
| get_coallition(self) | Function | Returns the coallition. |
| \_\_str\_\_(self) | Function | Returns the username of the user. |


### Tournament Model <a name="Tournament-M"></a>
| Name | Type | Description |
| ------ | ------ | ------ |
| STATE_CHOICES | list of tuples | list of possible states. |
| id | AutoField | Identifier of the tournament. |
| uuid | UUIDField | Identifier of the Host user. |
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
