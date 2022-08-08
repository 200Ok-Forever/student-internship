from flask_restx import Namespace, fields


class ChatAPI:
    api = Namespace("chat", description="Chat system and related functions")

    zoom_link = api.model(
        "Zoom link",
        {
            "otherUserId": fields.Integer(required=True),
            "time": fields.String(required=True)
        }
    )
