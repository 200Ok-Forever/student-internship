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
                   }, 401

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
            msg = Message('Thanks for joining InternHub.', sender='internhub.200okforever@gmail.com',
                          recipients=[email])
            msg.body = "Hi, welcome to InternHub, please confirm your email, thanks!"
            mail.send(msg)
            return {
                       "status": True,
                       "message": "Confirmation email sent.",
                   }, 200
        else:
            user = User.query.filter_by(email=email).first()
            print(user)
            if user:
                totp = pyotp.TOTP("23base23", digits=6, interval=600)
                msg = Message('InternHub: checkout your verification code.', sender='internhub.200okforever@gmail.com',
                              recipients=[email])
                msg.body = f"""Hi there, 

This is a verification email to reset your password on InternHub. Your verification code is: 

{totp.now()}

Please enter this code in the reset password page.
if you did not request a password reset, please ignore this email.
"""
                mail.send(msg)
                user.verification_code = totp.now()
                print(user.get_info())
                db.session.commit()
                return {
                           "status": True,
                           "message": "Verification code has been sent to the email.",
                       }, 200
            else:
                return {
                           "status": False,
                           "message": "User does not exist.",
                       }, 404

    @staticmethod
    def verify_code(data):
        email = data["email"]
        password = bytes(data["password"], 'utf-8')
        verification_code = data["verification_code"]
        user = User.query.filter_by(email=email).first()
        if user is not None:
            correct_code = User.query.with_entities(User.verification_code).filter_by(email=email).first()
            if correct_code is not None:
                if verification_code == correct_code[0] and correct_code[0] is not None:
                    user.password = password
                    user.verification_code = None
                    db.session.commit()
                    print(user.get_info())
                    return {
                               "status": True,
                               "message": "Verification code is correct.",
                           }, 200
                else:
                    return {
                               "status": False,
                               "message": "Verification code is incorrect.",
                           }, 403
            else:
                return {
                           "status": False,
                           "message": "Please resend the verification code.",
                       }, 404
        else:
            return {
                       "status": False,
                       "message": "User does not exist.",
                   }, 404

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

    @staticmethod
    def updateUserInfoLong(data):
        current_user_id = get_jwt_identity()
        user = User.query.filter_by(uid=current_user_id).first()
        if data['first_name'] or data['last_name'] or data['university'] or data['degree'] is not None:
            current_student = Student.query.filter_by(email=user.email).first()
            if current_student is not None:
                current_student.first_name = data['first_name']
                current_student.last_name = data['last_name']
                current_student.university = data['university']
                current_student.degree = data['degree']
                current_student.major = data['major']
                current_student.position = data['position']
                current_student.skills = data['skills']
                current_student.description = data['description']
                db.session.commit()
                return {
                           "status": True,
                           "message": "User info updated.",
                       }, 200
            else:
                return {
                           "status": False,
                           "message": "Student not found.",
                       }, 404
        else:
            return {
                       "status": False,
                       "message": "please fill in required data correctly.",
                   }, 400
