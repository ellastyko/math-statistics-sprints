from flask import Flask
from app.methods import Method
import os, config

# создание экземпляра приложения

app = Flask(__name__)
method = Method()


# import views
from . import views