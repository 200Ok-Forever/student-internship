"""App configuration object"""
import os
from datetime import timedelta


class Config:
    DEBUG = True

    # Info
    SITE_NAME = os.environ.get("SITE_NAME", "InternHub")
    SECRET_KEY = os.environ.get("SECRET_KEY", os.urandom(24))

    # Mail
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.163.com')
    MAIL_PORT = os.environ.get('MAIL_PORT', 465)
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', 'zhy1998618@163.com')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', 'TOQGDQNPUYPAIVLA')
    MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL', True)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', False)

    # JWT
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", os.urandom(24))
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)

    # Database
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://admin:admin123@database-2.c97z4t8dhno9.us-west-1.rds.amazonaws.com" \
                              ":3306/200okforever"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Language
    SUPPORTED_LOCALES = ['en']


# Use this for demo
class DevConfig(Config):
    ASSETS_DEBUG = True


class TestConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
