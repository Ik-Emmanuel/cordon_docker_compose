import logging
import os
import uuid
import datetime
from flask import Flask, current_app, abort, render_template, redirect, url_for, request,session, jsonify, send_from_directory
from flask_session import Session
from werkzeug.utils import secure_filename
from werkzeug.exceptions import BadRequest, HTTPException
from pathlib import Path
from dotenv import load_dotenv
import app_config
import random
from datetime import datetime
import json
import psycopg2
import shutil
import requests
from urllib.parse import quote

path = (os.path.dirname(__file__))
env_file = os.path.join(path, ".env")
load_dotenv(env_file)

def fetch_env_or_config(app, value):
    """
    This function tries to get value from env first 
    else app configuration else returns none
    """
    try:
        result = os.environ.get(value, None)
        if result:
            return result
        else:
            result = app.config.get(value, None)
            if result:
                return result
            else:
                return None
    except Exception as e:
        return None


# ================================ helper functions
def format_search_word(keyword:str)-> str:
    if ' ' in keyword:
        return quote(keyword)
    else:
        return keyword
   


def get_search(baseurl: str, keyword:str):
    formatted_keyword = format_search_word(keyword)
    search_url = f"{baseurl}/search/index.json?page=1&itemsPerPage=100000&searchFor={formatted_keyword}"
    response = requests.get(search_url)
    if response.status_code == 200:
        print(response.json)
    else:
        print(f"Error: {response.status_code}")
    
    return response




def create_app(secure_client_credential=None):
    app = Flask(__name__, root_path=Path(__file__).parent) #initialize Flask app
    # setup_db(app)
    app.config.from_object(app_config)
    storage_path = fetch_env_or_config(app,'FILE_STORAGE_PATH')

    # override with env variables
    app.config.update(
    DATABASE = fetch_env_or_config(app,'DATABASE'),
    DATABASE_USER = fetch_env_or_config(app,'DATABASE_USER'),
    DATABASE_PASSWORD = fetch_env_or_config(app,'DATABASE_PASSWORD'), 
    DATABASE_HOST = fetch_env_or_config(app,'DATABASE_HOST'),
    DATABASE_PORT = fetch_env_or_config(app,'DATABASE_PORT'),
    FILE_STORAGE_PATH = fetch_env_or_config(app,'FILE_STORAGE_PATH'),
    )

    Session(app)  
    
    database_name = fetch_env_or_config(app,'DATABASE') 
    database_user = fetch_env_or_config(app,'DATABASE_USER') 
    database_password = fetch_env_or_config(app,'DATABASE_PASSWORD') 
    database_host = fetch_env_or_config(app,'DATABASE_HOST')
    database_port = fetch_env_or_config(app,'DATABASE_PORT')
    database_path = 'postgresql://{}:{}@{}:{}/{}'.format(
    database_user, database_password,
    database_host, database_port, database_name
    )
    conn = psycopg2.connect(
    dbname=database_name,
    user=database_user,
    password=database_password,
    host=database_host,
    port=database_port
    )
    app.logger.level=logging.INFO 
    if app.config.get('ENV') == 'production':
        from werkzeug.middleware.proxy_fix import ProxyFix
        app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)
        
    
    # ================= Route functions    
    @app.route('/apiserver')
    def index():
        return jsonify({
            "backend_status":"Active"
        })
    
    @app.route('/apiserver/async')
    async def test_async():
        return jsonify({
            "backend_async_status":"Active"
        })
    
    @app.route('/apiserver/search',  methods=['POST', 'OPTIONS'])
    async def search():
        data ={}
        if request.method == 'POST':
            data = request.json
            print("we are here ***", data)
            keyword = data.get('keyword', None)
            if not keyword:
                return jsonify({
                "error":"No keyword passed"
            }, status=400)
            baseurl="https://catalogue.cordon.uk/erddap"
            search_response = get_search(baseurl, keyword)
            print(search_response.json())
            return search_response.json()
        
        return  jsonify({'message':'This endpoint requires post method'})

    
    
    return app


if __name__ == '__main__':
    app=create_app() #running flask's dev server
    app.run(host="0.0.0.0" ) # Non ssl


app=create_app()

