from email.policy import default
from flask import request, jsonify
from flask_restx import Resource, reqparse
from pyrsistent import get_in
from .chat_model import ChatPageAPI
from .chat_utils import ChatUtils

from ...Models.model import Internship, InternshipSearchSchema
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity
chatapi = ChatPageAPI.api



@chatapi.route('/chat/users')
class ChatUser(Resource):

    def get(self):
        return ChatUtils.getUser()
        pass