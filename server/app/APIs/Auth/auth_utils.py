from datetime import datetime, timezone

import pyotp
from flask import current_app, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity
from flask_mail import Message
from ...Models.model import User, Student
from ...Models.skill import Skill
from ...Models.company import Companies, Industry
from ... import db, mail, jwt
from datetime import timedelta
import redis

r = redis.StrictRedis(host='redis-16963.c90.us-east-1-3.ec2.cloud.redislabs.com', port=16963,
                      username='default', password='=200ok=forever', decode_responses=True)


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
                           "message": "The email you have entered does not match any account.",
                       }, 404

            elif user and user.verify_password(password):
                user_info = User.get_info(user)
                print(user_info)
                access_token = create_access_token(identity=user_info['uid'])
                resp = {"status": True,
                        "message": "Successfully logged in.",
                        "token": access_token,
                        "user_info": user_info
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
            db.session.add(new_user)
            db.session.commit()
            user_id = User.query.with_entities(User.uid).filter_by(email=email).first()
            new_student = Student(
                id=user_id[0],
                email=email,
                first_name=data["first_name"],
                last_name=data["last_name"],
                university=data["university"],
                degree=data["degree"],
                major=data["major"],
                position=data["position"],
                description=data["description"],
            )
            for skill_id in data["skills"]:
                skill = Skill.query.filter_by(id=skill_id).first()
                new_student.skills.append(skill)
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
            db.session.add(new_user)
            db.session.commit()
            user_id = User.query.with_entities(User.uid).filter_by(email=email).first()
            print(data)
            new_company = Companies(
                id=user_id[0],
                email=email,
                company_name=data["company_name"],
                first_name=data["first_name"],
                last_name=data["last_name"],
                linkedin=data["linkedin"],
                company_url=data["company_url"],
                founded_year=data["founded_year"],
                company_size=data["company_size"],
                country=data["country"],
                city=data["city"],
                line1=data["line1"],
                postalCode=data["postalCode"],
                description=data["description"],
                company_logo=data["company_logo"]
            )
            for industry_id in data["industry"]:
                industry = Industry.query.filter_by(id=industry_id).first()
                new_company.industries.append(industry)
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
                    }
            return resp, 201
        except Exception as error:
            current_app.logger.error(error)
            return {
                       "status": False,
                       "message": "Something went wrong during the process!",
                   }, 500

    @staticmethod
    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
        jti = jwt_payload["jti"]
        token_in_redis = r.get(jti)
        print(jti, token_in_redis, token_in_redis is not None)
        return token_in_redis is not None

    @staticmethod
    def logout():
        jti = get_jwt()["jti"]
        r.set(jti, "", ex=timedelta(hours=1))
        return jsonify(msg="logout successful")

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
    def userInfoShort(uid):
        user = User.query.filter_by(uid=uid).first()
        if user is not None:
            user_info = User.get_info(user)
            return user_info, 200
        return {
                   "status": False,
                   "message": "User not found.",
               }, 404

    @staticmethod
    def updateUserInfoShort(data):
        current_user_id = get_jwt_identity()
        current_user = User.query.filter_by(uid=current_user_id).first()
        if data["avatar"] is not None:
            current_user.avatar = data["avatar"]
            db.session.commit()
            return {
                       "status": True,
                       "message": "User info updated.",
                       "user_info": current_user.get_info()
                   }, 200
        else:
            return {
                       "status": False,
                       "message": "please fill in required data correctly.",
                   }, 404

    @staticmethod
    def userInfoLong(uid):
        user = User.query.filter_by(uid=uid).first()
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
                current_student.description = data['description']
                current_student.skills = []
                db.session.commit()
                for skill_id in data["skills"]:
                    skill = Skill.query.filter_by(id=skill_id).first()
                    current_student.skills.append(skill)
                db.session.commit()
                return {
                           "status": True,
                           "message": "User info updated.",
                           "student_info": Student.get_info(current_student)
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

    @staticmethod
    def getSkillID(name):
        skill = Skill.query.filter_by(name=name).first()
        if skill:
            return {
                       'skill_id': skill.id,
                   }, 200
        else:
            return {
                       'msg': 'skill not found',
                   }, 404

    @staticmethod
    def getSkills():
        skills = Skill.query.all()
        if skills:
            return {
                       'skills': [skill.get_info() for skill in skills],
                   }, 200
        else:
            return {
                       'msg': 'skills not found',
                   }, 404

    @staticmethod
    def getIndustryID(name):
        industry = Industry.query.filter_by(name=name).first()
        if industry:
            return {
                       'industry_id': industry.id,
                   }, 200
        else:
            return {
                       'msg': 'industry not found',
                   }, 404

    @staticmethod
    def getIndustries():
        industries = Industry.query.all()
        if industries:
            return {
                       'industries': [industry.get_info() for industry in industries],
                   }, 200
        else:
            return {
                       'msg': 'industries not found',
                   }, 404
