import os
import datetime
from dotenv import load_dotenv

path = (os.path.dirname(__file__))
env_file = os.path.join(path, ".env")
load_dotenv(env_file)

from sqlalchemy import Column, String, DateTime, Integer, Boolean, Enum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import text
from datetime import datetime
from enum import Enum as PyEnum
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()



def fetch_env_or_config(app, value):
    """
    This function tries to get value from env first 
    else app configuration else returns none
    """
    try:
        value = os.environ[value]
        if value:
            return value
        else:
            value = app.config.get(value, None)
            if value:
                return value
            else:
                return None
    except Exception as e:
        return None


def setup_db(app):
    """
        binds a flask application and a SQLAlchemy service
    """
    database_name = fetch_env_or_config(app,'DATABASE') 
    database_user = fetch_env_or_config(app,'DATABASE_USER') 
    database_password = fetch_env_or_config(app,'DATABASE_PASSWORD') 
    database_host = fetch_env_or_config(app,'DATABASE_HOST')
    database_port = fetch_env_or_config(app,'DATABASE_PORT')
    database_path = 'postgresql://{}:{}@{}:{}/{}'.format(
    database_user, database_password,
    database_host, database_port, database_name
    )
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    # db.create_all()



def execute_raw_sql_query(query):
    """
    Executes a raw SQL query and returns the result
    """
    result = db.session.execute(text(query))
    return result.fetchall()


def execute_raw_update_query(query):
    """
    Executes a raw SQL update query
    """
    try:
        db.session.execute(text(query))
        db.session.commit()
        return True  # Successful update
    except Exception as e:
        db.session.rollback()
        print("Error executing SQL update query:", e)
        return False  

class UserRole(PyEnum):
    SUPERADMIN = 'SUPERADMIN'
    ADMIN = 'ADMIN'
    USER = 'USER'


class User(db.Model):
    __tablename__ = 'User'

    id = db.Column(db.String, primary_key=True, default='cuid')
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    email_verified = db.Column(db.DateTime)
    image = db.Column(db.String)
    password = db.Column(db.String)
    role = db.Column(db.Enum(UserRole), default=UserRole.USER)
    is_profile_complete = db.Column(db.Boolean, default=False)
    accounts = db.relationship("Account", backref="account_user", lazy=True)
    profile = db.relationship("Profile", backref="profile_user", lazy=True)
    entry_sas = db.relationship("EntrySas", backref="user_entry", lazy=True)

    def __init__(self, name, email, password, role=UserRole.USER, is_profile_complete=False):
        self.name = name.title()
        self.email = email.lower()
        self.password = password
        self.role = role
        self.is_profile_complete = is_profile_complete

    def insert(self, session):
        session.add(self)
        session.commit()

    def update(self, session):
        session.commit()

    def delete(self, session):
        session.delete(self)
        session.commit()

