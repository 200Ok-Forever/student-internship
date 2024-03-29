from flask import request, jsonify, current_app
from flask_restx import Resource, reqparse
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
skill_name_parser = reqparse.RequestParser()
skill_name_parser.add_argument('name', type=str, required=True, help='Skill name is required')
industry_name_parser = reqparse.RequestParser()
industry_name_parser.add_argument('name', type=str, required=True, help='Industry name is required')


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
            422: "Invalid token",
        },
    )
    @jwt_required()
    @auth_api.expect(authParser, validate=True)
    def delete(self):
        """ Logout """
        return AuthUtils.logout()


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

        return AuthUtils.send_confirmation_email(send_data["email"], flag=2)


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

        return AuthUtils.verify_code(send_data)


@auth_api.route("/continueSession")
class ContinueSession(Resource):
    @auth_api.doc(
        "Continue session",
        responses={
            200: "Successfully continuing session",
            400: "Malformed data or validations failed.",
            422: "Invalid token",
        },
    )
    @auth_api.expect(authParser, validate=True)
    @jwt_required()
    def get(self):
        """ Continue session """
        uid = get_jwt_identity()
        return AuthUtils.userInfoShort(uid)


@auth_api.route("/userInfoShort/<int:uid>")
class UserInfoShort(Resource):
    @auth_api.doc(
        "User info short",
        params={'uid': 'User ID'},
        responses={
            200: "Successfully get user info",
            400: "Malformed data or validations failed.",
        },
    )
    def get(self, uid):
        """ User info short """
        return AuthUtils.userInfoShort(uid)


@auth_api.route("/userInfoShort")
class updateUserInfoShort(Resource):
    update_user_info_short = AuthAPI.update_user_info_short

    @auth_api.doc(
        "User info short",
        responses={
            200: "Successfully get user info",
            400: "Malformed data or validations failed.",
            422: "Invalid token",
        },
    )
    @jwt_required()
    @auth_api.expect(authParser, update_user_info_short, validate=True)
    def post(self):
        """ User info short """
        # Grab the json data
        update_form, update_data = request.form, request.get_json()
        return AuthUtils.updateUserInfoShort(update_data)


@auth_api.route("/userInfoLong/<int:uid>")
class UserInfoLong(Resource):

    @auth_api.doc(
        "User info long",
        params={'uid': 'User ID'},
        responses={
            200: "Successfully get user info",
            400: "Malformed data or validations failed.",
        },
    )
    def get(self, uid):
        """ User info long """
        return AuthUtils.userInfoLong(uid)


@auth_api.route("/userInfoLong")
class updateUserInfoLong(Resource):
    update_user_info_long = AuthAPI.update_user_info_long

    @auth_api.doc(
        "User info long",
        responses={
            200: "Successfully get user info",
            400: "Malformed data or validations failed.",
            422: "Invalid token",
        },
    )
    @jwt_required()
    @auth_api.expect(authParser, update_user_info_long, validate=True)
    def post(self):
        """ User info long """
        send_form, send_data = request.form, request.get_json()
        return AuthUtils.updateUserInfoLong(send_data)


@auth_api.route("/skill_id")
class GetSkillID(Resource):

    @auth_api.doc(
        "Get skill ID",
        responses={
            200: "Successfully get skill ID",
            400: "Malformed data or validations failed.",
        },
    )
    @auth_api.expect(skill_name_parser, validate=True)
    def get(self):
        """ Get skill ID """
        # Grab the json data
        args = skill_name_parser.parse_args()
        return AuthUtils.getSkillID(args['name'])


@auth_api.route("/skills")
class GetSkills(Resource):

    @auth_api.doc(
        "Get all skill data",
        responses={
            200: "Successfully get all skill data",
            400: "Malformed data or validations failed.",
        },
    )
    def get(self):
        """ Get all skill data """
        return AuthUtils.getSkills()


@auth_api.route("/industry_id")
class GetIndustryID(Resource):

    @auth_api.doc(
        "Get industry ID",
        responses={
            200: "Successfully get skill ID",
            400: "Malformed data or validations failed.",
        },
    )
    @auth_api.expect(industry_name_parser, validate=True)
    def get(self):
        """ Get skill ID """
        # Grab the json data
        args = industry_name_parser.parse_args()
        return AuthUtils.getIndustryID(args['name'])


@auth_api.route("/industries")
class GetIndustries(Resource):

    @auth_api.doc(
        "Get all skill data",
        responses={
            200: "Successfully get all skill data",
            400: "Malformed data or validations failed.",
        },
    )
    def get(self):
        """ Get all skill data """
        return AuthUtils.getIndustries()
