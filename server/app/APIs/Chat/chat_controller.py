from flask import request, jsonify, current_app
from flask_restx import Resource, reqparse
from .chat_model import ChatAPI
from .chat_utils import ChatUtils
from flask_jwt_extended import jwt_required
from ...Models.chat import Invitation
from ...Models.model import User, Internship, Student
from ...Models.company import Companies
from flask_jwt_extended import get_jwt_identity
from ... import db
from ...Helpers.other_util import convert_object_to_dict, convert_model_to_dict

chat_api = ChatAPI.api

auth_parser = reqparse.RequestParser()
auth_parser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxx')


@chat_api.route("/meeting/invitation")
class SendMeetingInvitation(Resource):
    zoom_link = ChatAPI.zoom_link

    @chat_api.doc("Send Zoom meeting invitation link", responses={
        200: "success",
        404: "User not found!",
    })

    @chat_api.expect(auth_parser, zoom_link)
    @jwt_required()
    def post(self):
        uid = get_jwt_identity()
        """ Send Zoom meeting invitation link """
        # Grab the json data
        data = request.get_json()
        info, status, user = ChatUtils.send_zoom_meeting_invitation(data)

        if status != 200:
            return info, status

        if user.role == 2:
            company_id = data['otherUserId']
            student_id = uid
        else:
            company_id = uid
            student_id = data['otherUserId']

        try:

            invi = Invitation(student_id, company_id, data['time'], info['start_url'], None)
            db.session.add(invi)
            db.session.commit()
        except:
            db.session.rollback()
            return {"message": "already has invitaion"}, 200
        return info, status


@chat_api.route('/users')
class GetUser(Resource):
    def get(self):
        return ChatUtils.getUser()


@chat_api.route('/meetings')
class GetMeetings(Resource):
    @chat_api.response(200, "Successfully")
    @chat_api.response(400, "Something wrong")
    @jwt_required()
    def get(self):
        uid = get_jwt_identity()
        # check user's role
        user = db.session.query(User).filter(User.uid == uid).first()
        if not user:
            return {"message": "Something wrong"},400
        query = db.session.query(Companies, Invitation, Student).filter(Companies.id == Invitation.company_id,
                                                                        Student.id == Invitation.student_id)
        # company
        if user.role == 2:
            query = query.filter(Invitation.company_id == uid)
        else:
            query = query.filter(Student.id == uid)

        data = query.all()

        result = []
        for company, invi, stu in data:
            if user.role == 2:
                data = convert_object_to_dict(invi)
                data["first_name"] = stu.first_name
                data['last_name'] = stu.last_name
            else:
                data = convert_object_to_dict(invi)
                data["name"] = company.company_name

            result.append(data)

        return {"invitations": result}, 200
