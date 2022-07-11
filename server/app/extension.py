"""Flask extension libraries"""

from flask_assets import Environment
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

assets = Environment()
bcrypt = Bcrypt()
cors = CORS()
limiter = Limiter(key_func=get_remote_address)
mail = Mail()
migrate = Migrate()
db = SQLAlchemy()
jwt = JWTManager()
# travis = Travis()
