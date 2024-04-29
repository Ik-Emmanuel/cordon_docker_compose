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



def create_app(secure_client_credential=None):
    app = Flask(__name__, root_path=Path(__file__).parent) #initialize Flask app
    # setup_db(app)
    
    
    app.config.from_object(app_config)
    
    storage_path = fetch_env_or_config(app,'FILE_STORAGE_PATH')
    IMAGE_DIR = os.path.join(storage_path, 'destination_files')
    PDF_DIR = os.path.join(storage_path, 'destination_docs')

    # overide with env variables
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
        
        
    @app.route('/apiserver')
    def index():
        return jsonify({
            "backend_status":"Active"
        })
    
    
    @app.route('/apiserver/test')
    def page_test():
        return render_template('index.html')
    
    
    @app.route('/apiserver/images/<filename>')
    def serve_image(filename):
        return send_from_directory(IMAGE_DIR, filename)

        envelope_id = request.form['envelope_id']
        document_id = "combined"
        
        try:
            result = get_envelop_documents(envelope_id, document_id)
            return jsonify(result)
        except Exception as e:
            print(e)
            result = {
                "data":False
            }
            return jsonify(result)
        
    return app


if __name__ == '__main__':
    app=create_app() #running flask's dev server
    app.run(host="0.0.0.0" ) # Non ssl


app=create_app()

