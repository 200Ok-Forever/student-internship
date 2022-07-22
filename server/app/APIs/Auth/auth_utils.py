from datetime import datetime, timezone

import pyotp
from flask import current_app, jsonify
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity
from flask_mail import Message
from ...Models.model import User, Student, Company
from ... import db, mail


class AuthUtils:
    @staticmethod
    def login(data):
        # Assign vars
        email = data["email"]
        password = data["password"]
        try:
            user = User.query.filter_by(email=email).first()
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

        # msg = Message('Thanks for joining InternHub', sender='zhy1998618@163.com', recipients=[email])
        # msg.body = "Hi, welcome to InternHub, please confirm your email, thanks!"
        # mail.send(msg)

        try:
            new_user = User(
                username=username,
                email=email,
                password=password,
                role=1,
                avatar=data["avatar"],
            )
            new_student = Student(
                email=email,
                first_name=data["first_name"],
                last_name=data["last_name"],
                university=data["university"],
                degree=data["degree"],
                major=data["major"],
                skills=data["skills"],
                description=data["description"]
            )
            db.session.add(new_user)
            db.session.add(new_student)
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

    @staticmethod
    def companySignup(data):
        email = data["email"]
        username = data["username"]
        password = bytes(data["password"], 'utf-8')

        # Check if the email is taken
        if User.query.filter_by(email=email).first() is not None:
            return {
                       "status": False,
                       "message": "Email is already being used.",
                   }, 403

        try:
            new_user = User(
                username=username,
                email=email,
                password=password,
                role=2,
                avatar=data["avatar"],
            )
            new_company = Company(
                email=email,
                company_name=data["company_name"],
                first_name=data["first_name"],
                last_name=data["last_name"],
                industry=data["industry"],
                linkedin=data["linkedin"],
                company_url=data["company_url"],
                founded_year=data["founded_year"],
                company_size=data["company_size"],
                location=data["location"],
                description=data["description"],
                company_logo=data["company_logo"]
            )
            db.session.add(new_user)
            db.session.add(new_company)
            db.session.commit()

            user = User.query.filter_by(email=email).first()
            user_info = User.get_info(user)
            # Create access token
            access_token = create_access_token(identity=new_user.uid)
            resp = {"status": True,
                    "message": "Successfully signup.",
                    "user": user_info,
                    "token": access_token,
                    'refresh_token': create_refresh_token(identity=username)
                    }
            return resp, 201
        except Exception as error:
            current_app.logger.error(error)
            return {
                       "status": False,
                       "message": "Something went wrong during the process!",
                   }, 500

    @staticmethod
    def send_confirmation_email(email, flag):
        if flag == 1:
            msg = Message('Thanks for joining InternHub.', sender='zhy1998618@163.com', recipients=[email])
            msg.body = "Hi, welcome to InternHub, please confirm your email, thanks!"
            mail.send(msg)
        else:
            totp = pyotp.TOTP("23base23", digits=6, interval=600)
            msg = Message('InternHub: checkout your verification code.', sender='zhy1998618@163.com',
                          recipients=[email])
            msg.body = "Hi there, your verification code is: " + totp.now()
            mail.send(msg)
            user = User.query.filter_by(email=email).first()
            user.verification_code = totp.now()
            db.session.commit()

    @staticmethod
    def verify_code(data):
        email = data["email"]
        verification_code = data["verification_code"]
        if User.query.filter_by(email=email).first() is not None:
            correct_code = User.query.with_entities(User.verification_code).filter_by(email=email).first()
            if correct_code is not None:
                if verification_code == correct_code:
                    return {
                               "status": True,
                               "message": "Verification code is correct.",
                           }, 200


    @staticmethod
    def userInfoShort():
        current_user_id = get_jwt_identity()
        user = User.query.filter_by(uid=current_user_id).first()
        if user is not None:
            user_info = User.get_info(user)
            return user_info, 200
        return {
                   "status": False,
                   "message": "User not found.",
               }, 404

    @staticmethod
    def userInfoLong():
        current_user_id = get_jwt_identity()
        user = User.query.filter_by(uid=current_user_id).first()
        if user.email is not None:
            current_student = Student.query.filter_by(email=user.email).first()
            print(current_student)
            if current_student is not None:
                student_info = Student.get_info(current_student)
                return student_info, 200
        return {
                   "status": False,
                   "message": "User not found.",
               }, 404
