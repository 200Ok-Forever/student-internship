"""App start at here"""

from app import create_app, config

app = create_app(config.DevConfig)

if __name__ == "__main__":
    app.run()