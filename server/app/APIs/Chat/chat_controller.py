from flask import request, jsonify, current_app
from flask_restx import Resource
from .chat_model import ChatAPI
from .chat_utils import ChatUtils
from flask_jwt_extended import jwt_required

chat_api = ChatAPI.api


@chat_api.route("/meeting/invitation")
class SendMeetingInvitation(Resource):
    zoom_link = ChatAPI.zoom_link

    @chat_api.doc("Send Zoom meeting invitation link", responses={
        200: "success",
        404: "User not found!",
    })
    @chat_api.expect(zoom_link)
    def post(self):
        """ Send Zoom meeting invitation link """
        # Grab the json data
        data = request.get_json()
        return ChatUtils.send_zoom_meeting_invitation(data)

    

@chat_api.route('/chat/users')
class GetUser(Resource):
    def get(self):
        return ChatUtils.getUser()
