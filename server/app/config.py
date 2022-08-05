"""App configuration object"""
import os
from datetime import timedelta
import pyotp


class Config:
    DEBUG = True

    # Info
    SITE_NAME = os.environ.get("SITE_NAME", "InternHub")
    SECRET_KEY = os.environ.get("SECRET_KEY", pyotp.random_base32())

    # Mail
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = os.environ.get('MAIL_PORT', 25)
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', 'internhub.200okforever@gmail.com')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', 'dqbregjrclhqokqy')
    MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL', False)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', True)

    # JWT
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", os.urandom(24))
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)

    # Database
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://admin:admin123@database-2.c97z4t8dhno9.us-west-1.rds.amazonaws.com" \
                              ":3306/200okforever"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Language
    SUPPORTED_LOCALES = ['en']

    # CORS
    CORS_HEADERS = 'Content-Type'


# Use this for demo
class DevConfig(Config):
    ASSETS_DEBUG = True


class TestConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
