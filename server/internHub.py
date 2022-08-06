"""App start at here"""

from app import create_app, config

app = create_app(config.Config)

if __name__ == "__main__":
    # port = 5000 will cause bug in Macbook Pro
    # port = 5000 is used by Air play
    app.run(port=5004, debug = True)
