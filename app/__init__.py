from flask import Flask
import os, config

# создание экземпляра приложения

app = Flask(__name__)


# import views
from . import views