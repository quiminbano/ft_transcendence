from .main import dictionary as main
from .menus import dictionary as menus
from .dashboard import dictionary as dashboard
from .pong import dictionary as pong
from .pongSingle import dictionary as pongSingle
from .pongSingle1v1 import dictionary as pongSingle1v1
from .pongSingle2v2 import dictionary as pongSingle2v2
from .tournament import dictionary as tournament
from .tournamentBoard import dictionary as tournamentBoard
from .login import dictionary as login
from .games import dictionary as games
from .signup import dictionary as signup
from .settings import dictionary as settings
from .usersPage import dictionary as usersPage
from .password42 import dictionary as password42
from .invitations import dictionary as invitations

pages = {
    "main": main,
	"login": login,
    "signup": signup,
    "menus": menus,
    "settings": settings,
    "dashboard": dashboard,
    "pong": pong,
    "pongSingle": pongSingle,
    "pongSingle1v1": pongSingle1v1,
    "pongSingle2v2": pongSingle2v2,
    "tournament": tournament,
    "tournamentBoard": tournamentBoard,
    "games": games,
    "usersPage": usersPage,
    "password42": password42,
    "invitations": invitations
}
