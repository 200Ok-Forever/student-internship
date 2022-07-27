"""App initialization"""
import time
from datetime import datetime, timezone, timedelta
from flask import Flask, g, request
from flask_jwt_extended import get_jwt, set_access_cookies, create_access_token, get_jwt_identity
from .extension import limiter, mail, bcrypt, assets, migrate, cors, db, jwt
from . import config
from .APIs import api_bp
# from .APIs.Auth import auth_bp


def create_app(config_name=config.Config):
    """Returns an initialized Flask application."""
    app = Flask(__name__)
    app.config.from_object(config_name)

    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            # Case where there is not a valid JWT. Just return the original response
            return response

    register_extensions(app)
    register_blueprints(app)

    @app.before_request
    def before_request():
        """Prepare some things before the application handles a request."""
        g.request_start_time = time.time()
        g.request_time = lambda: '%.5fs' % (time.time() - g.request_start_time)
        g.pjax = 'X-PJAX' in request.headers

    return app


def register_extensions(app):
    """Register extensions with the Flask application."""
    db.init_app(app)
    mail.init_app(app)
    bcrypt.init_app(app)
    assets.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)
    # redis.init_app(app)


def register_blueprints(app):
    """Register blueprints with the Flask application."""
    app.register_blueprint(api_bp)
