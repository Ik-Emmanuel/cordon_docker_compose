import logging
import os
import json

from flask import Flask, render_template, redirect, url_for, request,session, jsonify, send_from_directory
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
        return response
    else:
        return None
    

def get_searched_full_details(baseurl: str, obtained_ids: list):
    all_datasets_search_url = f"{baseurl}/tabledap/allDatasets.json"
    response = requests.get(all_datasets_search_url)
    if response.status_code == 200:
        all_datasets_json = response.json()
        all_datasets_rows = all_datasets_json["table"]["rows"]
        
        columns = ["datasetID", "accessible","institution", "dataStructure", "cdm_data_type","class", "title","minLongitude", "maxLongitude","longitudeSpacing", "minLatitude", "maxLatitude", "latitudeSpacing", "minAltitude","maxAltitude", "minTime", "maxTime", "timeSpacing", "griddap", "subset", "tabledap", "MakeAGraph","sos", "wcs", "wms","files", "fgdc","iso19115", "metadata", "sourceUrl", "infoUrl", "rss", "email",   "testOutOfDate","outOfDate", "summary" ]
        
        results = [item for item in all_datasets_rows if item[0] in obtained_ids]
        response_data = [{column: value for column, value in zip(columns, row)} for row in results]
        
        json_response = response_data
        return json_response
    else:
        print(f"Error: {response.status_code}")
    
    

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
            keyword = data.get('keyword', None)
            if not keyword:
                return jsonify({
                "error":"No keyword passed"
            }, status=400)
            baseurl="https://catalogue.cordon.uk/erddap"
            search_response = get_search(baseurl, keyword)
            if search_response and search_response.status_code  == 200:
                results = search_response.json()
                data_obtained = results["table"]["rows"]
                dataset_ids = [i[-1] for i in data_obtained]
                final_results = get_searched_full_details(baseurl, dataset_ids)
                if final_results:
                    return jsonify(final_results)
            else:
                return jsonify([])
            
        return  jsonify({'message':'This endpoint requires post method'})

    
    
    return app


    #"columnNames": ["griddap","Subset","tabledap","Make A Graph","wms", "files", "Title", "Summary", "FGDC", "ISO 19115","Info","Background Info", "RSS", "Email","Institution","Dataset ID"],

    # "full columnNames": ["datasetID", "accessible","institution", "dataStructure", "cdm_data_type","class", "title","minLongitude", "maxLongitude","longitudeSpacing", "minLatitude", "maxLatitude", "latitudeSpacing", "minAltitude","maxAltitude", "minTime", "maxTime", "timeSpacing", "griddap", "subset", "tabledap", "MakeAGraph","sos", "wcs", "wms","files", "fgdc","iso19115", "metadata", "sourceUrl", "infoUrl", "rss", "email",   "testOutOfDate","outOfDate", "summary" ],

if __name__ == '__main__':
    app=create_app() #running flask's dev server
    app.run(host="0.0.0.0" ) # Non ssl


app=create_app()

