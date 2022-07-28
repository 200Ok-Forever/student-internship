from flask import request, jsonify, current_app
from flask_restx import Resource
from .auth_model import AuthAPI
from ...Models.model import LoginSchema, StudentSignUpSchema, CompanySignUpSchema
from .auth_utils import AuthUtils
from flask_jwt_extended import jwt_required, unset_jwt_cookies, get_jwt_identity, create_access_token

auth_api = AuthAPI.api

login_schema = LoginSchema()
student_signup_schema = StudentSignUpSchema()
company_signup_schema = CompanySignUpSchema()

authParser = auth_api.parser()
authParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')


@auth_api.route("/login")
class Login(Resource):
    """ User login endpoint
    User registers then receives the user's information and access_token
    """

    user_login = AuthAPI.user_login
    user_login_success = AuthAPI.login_success

    @auth_api.doc(
        "User login",
        responses={
            200: ("Logged in", user_login_success),
            400: "Validations failed.",
            403: "Incorrect password or incomplete credentials.",
            404: "Email does not match any account.",
        },
    )
    @auth_api.expect(user_login, validate=True)
    def post(self):
        """ Login using email and password """
        # Grab the json data
        login_form, login_data = request.form, request.get_json()
        # Validate data
        errors = login_schema.validate(login_form)
        if errors:
            return {"login": False, "errors": errors}, 400

        return AuthUtils.login(login_data)


@auth_api.route("/logout")
class Logout(Resource):
    """ User logout endpoint """

    @auth_api.doc(
        "User logout",
        responses={
            200: "Logout success",
            400: "Validations failed.",
            403: "Incorrect password or incomplete credentials.",
            404: "Email does not match any account.",
        },
    )
    @jwt_required()
    @auth_api.expect(authParser, validate=True)
    def post(self):
        """ Logout """
        try:
            response = jsonify({"msg": "logout successful"})
            unset_jwt_cookies(response)
            return response
        except Exception as error:
            current_app.logger.error(error)
            return {
                       "status": False,
                       "message": error,
                   }, 500


@auth_api.route("/signup/student")
class StudentSignup(Resource):
    student_signup = AuthAPI.student_signup
    student_signup_success = AuthAPI.student_signup_success

    @auth_api.doc(
        "Student signup success",
        responses={
            201: ("Successfully signup as student.", student_signup_success),
            400: "Malformed data or validations failed.",
        },
    )
    @auth_api.expect(student_signup, validate=True)
    def post(self):
        """ Student signup """
        # Grab the json data
        signup_form, signup_data = request.form, request.get_json()
        # Validate data
        errors = student_signup_schema.validate(signup_form)
        if errors:
            return {"login": False, "errors": errors}, 400

        return AuthUtils.studentSignup(signup_data)


@auth_api.route("/signup/company")
class CompanySignup(Resource):
    company_signup = AuthAPI.company_signup
    company_signup_success = AuthAPI.company_signup_success

    @auth_api.doc(
        "Company signup success",
        responses={
            201: ("Successfully signup as company.", company_signup_success),
            400: "Malformed data or validations failed.",
        },
    )
    @auth_api.expect(company_signup, validate=True)
    def post(self):
        """ Company signup """
        # Grab the json data
        signup_form, signup_data = request.form, request.get_json()
        # Validate data
        errors = company_signup_schema.validate(signup_form)
        if errors:
            return {"login": False, "errors": errors}, 400

        return AuthUtils.companySignup(signup_data)


@auth_api.route("/password_reset/send")
class PasswordResetSend(Resource):
    password_reset_send = AuthAPI.password_reset_send

    @auth_api.doc(
        "Password reset request send success",
        responses={
            201: "Successfully send a verification code to the email",
            400: "Malformed data or validations failed.",
        },
    )
    @auth_api.expect(password_reset_send, validate=True)
    def post(self):
        """ Password reset send """
        # Grab the json data
        send_form, send_data = request.form, request.get_json()
        # Validate data
        # errors = company_signup_schema.validate(send_form)
        # if errors:
        #     return {"login": False, "errors": errors}, 400

        AuthUtils.send_confirmation_email(send_data["email"], flag=2)
        return "send"


@auth_api.route("/password_reset/reset")
class PasswordResetReset(Resource):
    password_reset_reset = AuthAPI.password_reset_reset

    @auth_api.doc(
        "Password reset success",
        responses={
            201: "Successfully send a verification code to the email",
            400: "Malformed data or validations failed.",
        },
    )
    @auth_api.expect(password_reset_reset, validate=True)
    def post(self):
        """ Password reset send """
        # Grab the json data
        send_form, send_data = request.form, request.get_json()
        # Validate data
        # errors = company_signup_schema.validate(send_form)
        # if errors:
        #     return {"login": False, "errors": errors}, 400

        AuthUtils.verify_code(send_data)
        return "send"


@auth_api.route("/userInfoShort")
class UserInfoShort(Resource):
    @auth_api.doc(
        "User info short",
        responses={
            200: "Successfully get user info",
            400: "Malformed data or validations failed.",
        },
    )
    @jwt_required()
    @auth_api.expect(authParser, validate=True)
    def get(self):
        """ User info short """
        return AuthUtils.userInfoShort()


@auth_api.route("/userInfoLong")
class UserInfoLong(Resource):
    @auth_api.doc(
        "User info long",
        responses={
            200: "Successfully get user info",
            400: "Malformed data or validations failed.",
        },
    )
    @jwt_required()
    @auth_api.expect(authParser, validate=True)
    def get(self):
        """ User info long """
        return AuthUtils.userInfoLong()
