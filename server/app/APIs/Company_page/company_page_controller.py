from flask import request, jsonify
from flask_restx import Resource
from .company_page_model import CompanyPageAPI
from .company_page_utils import CompanyPageUtils
from flask_jwt_extended import jwt_required

company_page_api = CompanyPageAPI.api


@company_page_api.route("/id")
class GetCompany(Resource):
    @company_page_api.doc("Get company", responses={
        200: "success",
        404: "User not found!",
    })
    # @jwt_required()
    def post(self):
        return "Hi"
