from flask_restx import Namespace, fields


class AuthAPI:
    api = Namespace("auth", description="Authenticate and receive tokens.")

    student_obj = api.model(
        "Student object",
        {
            "uid": fields.Integer,
            "username": fields.String,
            "email": fields.String,
            "first_name": fields.String,
            "last_name": fields.String,
            "university": fields.String,
            "degree": fields.String,
            "major": fields.String,
            "skills": fields.String,
            "description": fields.String
        },
    )

    company_obj = api.model(
        "Company object",
        {
            "uid": fields.Integer,
            "username": fields.String,
            "email": fields.String,
            "first_name": fields.String,
            "last_name": fields.String,
            "university": fields.String,
            "degree": fields.String,
            "major": fields.String,
            "skills": fields.String,
            "description": fields.String
        },
    )

    student_auth_signup = api.model(
        "Student signup data",
        {
            "email": fields.String(required=True),
            "username": fields.String(required=True),
            # Name is optional
            "name": fields.String,
            "password": fields.String(required=True),
        },
    )

    company_auth_signup = api.model(
        "Company signup data",
        {
            "email": fields.String(required=True),
            "username": fields.String(required=True),
            # Name is optional
            "name": fields.String,
            "password": fields.String(required=True),
        },
    )

    auth_login = api.model(
        "Login data",
        {
            "email": fields.String(required=True),
            "password": fields.String(required=True),
        },
    )

    student_auth_success = api.model(
        "Student login/signup success response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "student": fields.Nested(student_obj),
            "token": fields.String,
        },
    )

    company_auth_success = api.model(
        "Company login/signup success response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "student": fields.Nested(student_obj),
            "token": fields.String,
        },
    )
