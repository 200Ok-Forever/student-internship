from flask_restx import Namespace, fields


class AuthAPI:
    api = Namespace("auth", description="Authenticate and receive tokens.", security='apikey')

    user_obj = api.model(
        "User object",
        {
            "uid": fields.Integer,
            "username": fields.String,
            "email": fields.String,
            "role": fields.Integer,
            "avatar": fields.String
        }
    )

    student_obj = api.model(
        "Student object",
        {
            "id": fields.Integer,
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
            "id": fields.Integer,
            "email": fields.String,
            "company_name": fields.String,
            "first_name": fields.String,
            "last_name": fields.String,
            "industry": fields.String,
            "linkedin": fields.String,
            "company_url": fields.String,
            "founded_year": fields.String,
            "company_size": fields.Integer,
            "location": fields.String,
            "description": fields.String,
            "logo": fields.String
        },
    )

    user_login = api.model(
        "User login request",
        {
            "email": fields.String(required=True),
            "password": fields.String(required=True),
        },
    )

    login_success = api.model(
        "User login success response",
        {
            "login": fields.Boolean,
            "message": fields.String,
            "user": fields.Nested(user_obj),
            "token": fields.String,
        },
    )

    student_signup = api.model(
        "Student signup request",
        {
            "email": fields.String(required=True),
            "password": fields.String(required=True),
            "username": fields.String(required=True),
            "first_name": fields.String(required=True),
            "last_name": fields.String(required=True),
            "university": fields.String(required=True),
            "degree": fields.String(required=True),
            "major": fields.String,
            "skills": fields.String,
            "description": fields.String,
            "avatar": fields.String
        },
    )

    company_signup = api.model(
        "Company signup request",
        {
            "email": fields.String(required=True),
            "password": fields.String(required=True),
            "username": fields.String(required=True),
            "company_name": fields.String(required=True),
            "first_name": fields.String(required=True),
            "last_name": fields.String(required=True),
            "industry": fields.String,
            "linkedin": fields.String,
            "company_url": fields.String,
            "founded_year": fields.String(required=True),
            "company_size": fields.String(required=True),
            "location": fields.String,
            "description": fields.String,
            "company_logo": fields.String,
            "avatar": fields.String
        },
    )

    student_signup_success = api.model(
        "Student signup success response",
        {
            "login": fields.Boolean,
            "message": fields.String,
            "student": fields.Nested(student_obj),
            "token": fields.String,
        },
    )

    company_signup_success = api.model(
        "Company signup success response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "company": fields.Nested(company_obj),
            "token": fields.String,
        },
    )

    student_info = api.model('Student', {
        'id': fields.String,
        'name': fields.String,
    })

    password_reset_send = api.model(
        "Password reset send request", {
            "email": fields.String(required=True)
        }
    )

    password_reset_reset = api.model(
        "Password reset request", {
            "email": fields.String(required=True),
            "password": fields.String(required=True),
            "verification_code": fields.String(required=True)
        }
    )
