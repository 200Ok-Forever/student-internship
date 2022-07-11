from flask import request, jsonify
from flask_restx import Resource
from .internships_model import InternshipsAPI
from .internships_utils import InternshipsUtils
from flask_jwt_extended import jwt_required

internships_api = InternshipsAPI.api


@internships_api.route("/internship")
class GetInternship(Resource):
    @internships_api.doc("Get internship", responses={
        200: "success",
        404: "User not found!",
    })
    # @jwt_required()
    def post(self):
        return "Hi"
