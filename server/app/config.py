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

    # Redis
    REDIS_HOST = 'redis-16963.c90.us-east-1-3.ec2.cloud.redislabs.com'
    REDIS_PORT = 16963
    REDIS_USERNAME = 'default'
    REDIS_PASSWORD = '=200ok=forever'

    # CORS
    CORS_HEADERS = 'Content-Type'

    # Zoom API Token
    ZOOM_API_TOKEN = "eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiJjM2F" \
                     "jYTk0Yi1jODliLTRiMmItOTBhNC04ZTUzNTE3Mjk1ZDYifQ" \
                     ".eyJ2ZXIiOjcsImF1aWQiOiI5NzIxNzMyZTA3ODY4MDkzYmF" \
                     "jMzc0MDk4MWU4YTg5MSIsImNvZGUiOiJmWk94Ym15V0ZJX0Y" \
                     "4TGhFMzcwVFhpNkRzb0RfRmtYQUEiLCJpc3MiOiJ6bTpjaWQ" \
                     "6VzIxVEpDdlRXRUp2WmtTN3FNYkEiLCJnbm8iOjAsInR5cGU" \
                     "iOjAsInRpZCI6MCwiYXVkIjoiaHR0cHM6Ly9vYXV0aC56b29" \
                     "tLnVzIiwidWlkIjoiRjhMaEUzNzBUWGk2RHNvRF9Ga1hBQSI" \
                     "sIm5iZiI6MTY1OTcxMjY0OCwiZXhwIjoxNjU5NzE2MjQ4LCJ" \
                     "pYXQiOjE2NTk3MTI2NDgsImFpZCI6IkV3b3BqeVNlU05TTkJ" \
                     "tdXlndm1uSVEiLCJqdGkiOiJjMjgzOGRjOC1hZmJiLTQ5OWU" \
                     "tOGNkMS05NTcxYzg3MmEzYjgifQ.MTT2Uul9TYkJFqsgfzJ0" \
                     "eyTmGsgjbJhwGlubJzk-SQEBybIlK3Gp5lPi3rXeUks3noII" \
                     "rqHYGWBYDiLc46LyPQ"


# Use this for demo
class DevConfig(Config):
    ASSETS_DEBUG = True


class TestConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
