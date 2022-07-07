from flask import request, jsonify
from flask_restx import Resource
from .auth_model import AuthAPI
from ...Models.model import LoginSchema, StudentSignUpSchema, CompanySignUpSchema
from .auth_utils import AuthUtils
from flask_jwt_extended import jwt_required, unset_jwt_cookies

api = AuthAPI.api

login_schema = LoginSchema()
student_signup_schema = StudentSignUpSchema()
company_signup_schema = CompanySignUpSchema()


@api.route("/login")
class Login(Resource):
    """ User login endpoint
    User registers then receives the user's information and access_token
    """

    user_login = AuthAPI.user_login
    user_login_success = AuthAPI.login_success

    @api.doc(
        "User login",
        responses={
            200: ("Logged in", user_login_success),
            400: "Validations failed.",
            403: "Incorrect password or incomplete credentials.",
            404: "Email does not match any account.",
        },
    )
    @api.expect(user_login, validate=True)
    def post(self):
        """ Login using email and password """
        # Grab the json data
        login_form, login_data = request.form, request.get_json()
        # Validate data
        if errors := login_schema.validate(login_form):
            return {"login": False, "errors": errors}, 400

        return AuthUtils.login(login_data)


@api.route("/logout")
class Logout(Resource):
    """ User logout endpoint """
    user_logout = AuthAPI.user_logout

    @api.doc(
        "User logout",
        responses={
            200: "Logout success",
            400: "Validations failed.",
            403: "Incorrect password or incomplete credentials.",
            404: "Email does not match any account.",
        },
    )
    @jwt_required()
    @api.expect(user_logout, validate=True)
    def post(self):
        """ Logout """
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response


@api.route("/signup/student")
class StudentSignup(Resource):
    student_signup = AuthAPI.student_signup
    student_signup_success = AuthAPI.student_signup_success

    @api.doc(
        "Student signup success",
        responses={
            201: ("Successfully signup as student.", student_signup_success),
            400: "Malformed data or validations failed.",
        },
    )
    @api.expect(student_signup, validate=True)
    def post(self):
        """ Student signup """
        # Grab the json data
        signup_form, signup_data = request.form, request.get_json()
        # Validate data
        if errors := student_signup_schema.validate(signup_form):
            return {"login": False, "errors": errors}, 400

        return AuthUtils.studentSignup(signup_data)


@api.route("/signup/company")
class CompanySignup(Resource):
    company_signup = AuthAPI.company_signup
    company_signup_success = AuthAPI.company_signup_success

    @api.doc(
        "Company signup success",
        responses={
            201: ("Successfully signup as company.", company_signup_success),
            400: "Malformed data or validations failed.",
        },
    )
    @api.expect(company_signup, validate=True)
    def post(self):
        """ Company signup """
        # Grab the json data
        signup_form, signup_data = request.form, request.get_json()
        # Validate data
        if errors := company_signup_schema.validate(signup_form):
            return {"login": False, "errors": errors}, 400

        return "signup"
