from app import app
from flask import render_template, request, redirect, url_for
import numpy as np
import matplotlib.pyplot as plt
import json

# @app.errorhandler(404)
def error404(e):
    return render_template('/pages/404.html'), 404


@app.route('/', methods=['GET', 'POST']) 
def index(): 
    return render_template('/pages/main.html')



@app.route('/t01', methods=['GET', 'POST'])
def t01():
    if request.method == 'POST':
        pass
    return render_template('/pages/t01.html')



@app.route('/t02', methods=['GET', 'POST'])
def t02():
    if request.method == 'POST':
        pass             
    return render_template('/pages/t02.html')

