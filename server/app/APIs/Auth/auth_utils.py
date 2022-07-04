from datetime import datetime
from flask import current_app
from flask_jwt_extended import create_access_token

from ...Models.model import Student, Company


class AuthUtils:
    @staticmethod
    def student_login(data):
        # Assign vars
        email = data["email"]
        password = data["password"]
        try:
            if not (student := Student.query.filter_by(email=email).first()):
                return {
                           "status": False,
                           "message": "The email you have entered does not match any account.",
                       }, 404

            elif student and student.verify_password(password):
                student_info = Student.get_info(student)
                access_token = create_access_token(identity=student_info.uid)
                resp = {"status": True,
                        "message": "Successfully logged in.",
                        "student": student_info,
                        "token": access_token
                        }
                return resp, 200

            return {
                       "status": False,
                       "message": "Failed to log in, password may be incorrect.",
                   }, 403

        except Exception as error:
            current_app.logger.error(error)
            return {
                       "status": False,
                       "message": "Something went wrong during the process!",
                   }, 500
