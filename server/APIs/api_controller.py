from flask_restx import Resource
from flask_jwt_extended import jwt_required
from .api_model import StudentAPI, CompanyAPI, InternshipAPI

student_api = StudentAPI.api
company_api = CompanyAPI.api
internship_api = InternshipAPI.api


@student_api.route("/student")
class GetStudent(Resource):
    @student_api.doc("Get students", responses={
        200: "success",
        404: "User not found!",
    })
    # @jwt_required()
    def post(self):
        return "Hi"


@company_api.route("/company")
class GetCompany(Resource):
    @company_api.doc("Get company", responses={
        200: "success",
        404: "User not found!",
    })
    # @jwt_required()
    def post(self):
        return "Hi"


@internship_api.route("/internship")
class GetInternship(Resource):
    @internship_api.doc("Get internship", responses={
        200: "success",
        404: "User not found!",
    })
    # @jwt_required()
    def post(self):
        return "Hi"
