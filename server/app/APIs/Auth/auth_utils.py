from datetime import datetime, timezone
from flask import current_app, jsonify
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from flask_mail import Message
from ...Models.model import User, Student, Company
from ... import db, mail


class AuthUtils:
    @staticmethod
    def login(data):
        # Assign vars
        username = data["username"]
        password = data["password"]
        try:
            user = User.query.filter_by(username=username).first()
            if not user:
                return {
                           "status": False,
                           "message": "The username you have entered does not match any account.",
                       }, 404

            elif user and user.verify_password(password):
                user_info = User.get_info(user)
                print(user_info)
                access_token = create_access_token(identity=user_info['uid'])
                resp = {"status": True,
                        "message": "Successfully logged in.",
                        "user": user_info,
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

    @staticmethod
    def studentSignup(data):
        email = data["email"]
        username = data["username"]
        password = bytes(data["password"], 'utf-8')

        # Check if the email is taken
        if User.query.filter_by(email=email).first() is not None:
            return {
                       "status": False,
                       "message": "Email is already being used.",
                   }, 403

        # Check if the username is taken
        if Student.query.filter_by(username=username).first() is not None:
            return {
                       "status": False,
                       "message": "Username is already taken.",
                   }, 403
        # msg = Message('Thanks for joining InternHub', sender='zhy1998618@163.com', recipients=[email])
        # msg.body = "Hi, welcome to InternHub, please confirm your email, thanks!"
        # mail.send(msg)

        try:
            new_user = User(
                email=email,
                password=password,
                role=1,
            )
            db.session.add(new_user)
            db.session.commit()
            user = User.query.filter_by(email=email).first()

            user_info = User.get_info(user)
            # Create access token
            access_token = create_access_token(identity=new_user.uid)
            resp = {"status": True,
                    "message": "Successfully signup.",
                    "user": user_info,
                    "token": access_token
                    }
            return resp, 201
        except Exception as error:
            current_app.logger.error(error)
            return {
                       "status": False,
                       "message": "Something went wrong during the process!",
                   }, 500
