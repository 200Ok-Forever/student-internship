from flask import request, jsonify
from flask_restx import Resource
from .forum_model import ForumAPI
from .forum_utils import ForumUtils
from flask_jwt_extended import jwt_required

forum_api = ForumAPI.api


@forum_api.route("/id")
class GetCompany(Resource):
    @forum_api.doc("Get forum", responses={
        200: "success",
        404: "User not found!",
    })
    # @jwt_required()
    def post(self):
        return "Hi"
