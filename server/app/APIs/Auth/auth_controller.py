from flask import request
from flask_restx import Resource
from .auth_model import AuthAPI
from ...Models.model import LoginSchema, StudentSignUpSchema, CompanySignUpSchema
from .auth_utils import AuthUtils

api = AuthAPI.api
student_auth_success = AuthAPI.student_auth_success
company_auth_success = AuthAPI.company_auth_success

login_schema = LoginSchema()
student_signup_schema = StudentSignUpSchema()
company_signup_schema = CompanySignUpSchema()


@api.route("/login")
class AuthLogin(Resource):
    """ User login endpoint
    User registers then receives the user's information and access_token
    """

    auth_login = AuthAPI.auth_login

    @api.doc(
        "Auth login",
        responses={
            200: ("Logged in", student_auth_success),
            400: "Validations failed.",
            403: "Incorrect password or incomplete credentials.",
            404: "Email does not match any account.",
        },
    )
    @api.expect(auth_login, validate=True)
    def post(self):
        """ Login using email and password """
        # Grab the json data
        login_form, login_data = request.form, request.get_json()

        print(login_form)
        # Validate data
        if login_schema.validate(login_form):
            return {"status": False, "errors": "error"}, 400

        return AuthUtils.student_login(login_data)


@api.route("/logout")
class AuthLogin(Resource):
    """ User logout endpoint
    User registers then receives the user's information and access_token
    """

    auth_logout = AuthAPI.auth_login

    @api.doc(
        "Auth login",
        responses={
            200: ("Logged in", student_auth_success),
            400: "Validations failed.",
            403: "Incorrect password or incomplete credentials.",
            404: "Email does not match any account.",
        },
    )
    # @api.expect(auth_login, validate=True)
    def post(self):
        """ Login using email and password """
        return "logout"


@api.route("/register")
class AuthRegister(Resource):
    auth_register = AuthAPI.student_auth_signup

    @api.doc(
        "Auth registration",
        responses={
            201: ("Successfully registered user.", student_auth_success),
            400: "Malformed data or validations failed.",
        },
    )
    # @api.expect(auth_register, validate=True)
    def post(self):
        """ User registration """
        return "signup"
