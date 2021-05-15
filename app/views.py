from app import app, method
from flask import render_template, request, redirect, url_for
import numpy as np
import matplotlib.pyplot as plt
import json

@app.errorhandler(404)
def error404(e):
    return render_template('/pages/404.html'), 404


@app.route('/', methods=['GET', 'POST']) 
def index(): 
    return render_template('/pages/main.html')



@app.route('/t<number>', methods=['GET', 'POST'])
def tasks(number):
    return render_template(f'/pages/t{number}.html')



@app.route('/api/solving', methods=['GET', 'POST'])
def api():
    if request.method == 'POST':
        data = json.loads(request.data.decode('utf-8'))
        
        # Controller
        if data['type'] == 'task01':
            return json.dumps(method.task1(data['data']))
        elif data['type'] == 'task02':
            return json.dumps(method.task2(data['data']))
        elif data['type'] == 'task03':
            return json.dumps(method.task3(data['data']))
        elif data['type'] == 'task04':
            method.task1(data['data'])
        elif data['type'] == 'task05':
            method.task1(data['data'])

        return json.dumps({'type': 'solving', 'code': 1, 'data': 'none' })
      