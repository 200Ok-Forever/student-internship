"""App initialization"""

import time
from flask import Flask, g, request
from server.extension import limiter, mail, bcrypt, assets, migrate
from server.Helpers.database import db
from server import config
from server.Models.model import Student
from APIs import api_bp
from Helpers.Auth import auth_bp


def create_app():
    """Returns an initialized Flask application."""
    app = Flask(__name__)
    app.config.from_object(config.Config)

    register_extensions(app)
    register_blueprints(app)

    # register_errorhandlers(app)
    # register_jinja_env(app)

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
    # rq.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)


def register_blueprints(app):
    """Register blueprints with the Flask application."""
    app.register_blueprint(api_bp)
    app.register_blueprint(auth_bp)

# def register_errorhandlers(app):
#     """Register error handlers with the Flask application."""
#
#     def render_error(e):
#         return render_template('errors/%s.html' % e.code), e.code
#
#     for e in [
#         requests.codes.INTERNAL_SERVER_ERROR,
#         requests.codes.NOT_FOUND,
#         requests.codes.UNAUTHORIZED,
#     ]:
#         app.errorhandler(e)(render_error)
#
#
# def register_jinja_env(app):
#     """Configure the Jinja env to enable some functions in templates."""
#     app.jinja_env.globals.update({
#         'timeago': lambda x: arrow.get(x).humanize(),
#         'url_for_other_page': url_for_other_page,
#     })
