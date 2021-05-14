import os, sys

BASE_DIR = os.path.dirname(__file__)
sys.path.append(BASE_DIR)

class config(object):

    DEBUG = True
    # cross-site request forgery — «межсайтовая подделка запроса»
    CSRF_ENABLED = True
    # Случайный ключ, которые будет исползоваться для подписи
    # данных, например cookies.
    SECRET_KEY = 'dfs734823k4l523j2l23ifj23'
    # URI используемая для подключения к базе данных