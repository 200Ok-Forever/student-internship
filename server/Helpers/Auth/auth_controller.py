from flask import request
from flask_restx import Resource
from .auth_model import AuthAPI
from server.Models.model import LoginSchema, RegisterSchema

api = AuthAPI.api
auth_success = AuthAPI.auth_success

login_schema = LoginSchema()
register_schema = RegisterSchema()


@api.route("/login")
class AuthLogin(Resource):
    """ User login endpoint
    User registers then receives the user's information and access_token
    """

    auth_login = AuthAPI.auth_login

    @api.doc(
        "Auth login",
        responses={
            200: ("Logged in", auth_success),
            400: "Validations failed.",
            403: "Incorrect password or incomplete credentials.",
            404: "Email does not match any account.",
        },
    )
    # @api.expect(auth_login, validate=True)
    def post(self):
        """ Login using email and password """
        return "login"


@api.route("/register")
class AuthRegister(Resource):
    auth_register = AuthAPI.auth_register

    @api.doc(
        "Auth registration",
        responses={
            201: ("Successfully registered user.", auth_success),
            400: "Malformed data or validations failed.",
        },
    )
    # @api.expect(auth_register, validate=True)
    def post(self):
        """ User registration """
        return "signup"
