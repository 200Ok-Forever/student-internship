"""App configuration object"""


# Use this for demo
class Config:
    SITE_NAME = "InternHub"
    FLASK_ENV = "development"
    TESTING = True
    SECRET_KEY = "0b65f0fa8f7f413c9f8d799cedefb002"
    STATIC_FOLDER = 'static'
    TEMPLATES_FOLDER = 'templates'

    # Database
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://admin:admin123@database-2.c97z4t8dhno9.us-west-1.rds.amazonaws.com :3306"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Language
    SUPPORTED_LOCALES = ['en']

    # AWS Secrets
    # AWS_SECRET_KEY = environ.get('AWS_SECRET_KEY')
    # AWS_KEY_ID = environ.get('AWS_KEY_ID')

# class DevConfig(Config):
#     ASSETS_DEBUG = True
#     WTF_CSRF_ENABLED = False
#
#
# class TestConfig(Config):
#     TESTING = True
#     WTF_CSRF_ENABLED = False
