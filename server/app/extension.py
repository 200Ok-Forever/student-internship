"""Flask extension libraries"""

from flask_assets import Environment
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# from flask_rq2 import RQ
# from flask_travis import Travis
# from werkzeug.contrib.cache import SimpleCache

assets = Environment()
bcrypt = Bcrypt()
cors = CORS()
limiter = Limiter(key_func=get_remote_address)
mail = Mail()
migrate = Migrate()
db = SQLAlchemy()
# travis = Travis()
