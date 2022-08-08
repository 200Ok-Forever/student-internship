from email.policy import default
from urllib import response
from flask import request, jsonify
from flask_restx import Resource, reqparse
from .internships_model import InternshipsAPI
from .internships_utils import InternshipsUtils

from ...Models.model import InternshipSearchSchema
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity

internships_api = InternshipsAPI.api

search_schema = InternshipSearchSchema()
search_internships = InternshipsAPI.search_internships

searrch_parser = reqparse.RequestParser()
searrch_parser.add_argument('job', location='args', help="search keyword")
searrch_parser.add_argument('location', location='args', help='city location')
searrch_parser.add_argument('sort', location='args', help='TRUE/FALSE')
searrch_parser.add_argument('paid', location='args', help='TRUE/FALSE')
searrch_parser.add_argument('is_remote', location='args', help='TRUE/FALSE')
searrch_parser.add_argument('job_type', location='args')
searrch_parser.add_argument('current_page', location='args')

@internships_api.route('/internships')
class GetInternshipList(Resource):

    # @internships_api.expect(search_internships)
    @internships_api.doc(body=searrch_parser)
    @internships_api.response(200, "Search successfully")
    @internships_api.response(404, "Internships not found")
    def get(self):

        args1 = request.args

        try:
            
            return InternshipsUtils.get_all_Internship(args1)
        except Exception as error:
            return {
                       "message": str(error)
                   }, 500



get_internship_parser=reqparse.RequestParser()
get_internship_parser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')

@internships_api.route('/internships/<int:id>')
class GetInternship(Resource):
    get_internship = InternshipsAPI.internship_get

    @internships_api.doc("Get internship", responses={
        200: "success",
        404: "This internship does not exist",
        404: "user not found",
        400 :"API KEY PROBELMS"

    })
    @internships_api.doc(body=get_internship_parser)
    @jwt_required(optional=True)
    def get(self, id):
        try:
            uid = get_jwt_identity()
            print(uid)
            return InternshipsUtils.get_Internship(id, uid)
        except Exception as error:
            return {
                       "message": error
                   }, 500


applyParser = internships_api.parser()
applyParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')


@internships_api.route('/internships/<int:id>/apply')
class ApplyInternship(Resource):
    internship_apply = InternshipsAPI.internship_apply

    @jwt_required()
    @internships_api.doc("apply internship", response= {
        400:"you have applied this internship",
       400: "user not found",
       200: "sucesfully"
    })
    @internships_api.expect(internship_apply, applyParser)
    def post(self, id):
        try:

            arg = request.get_json()
            print(arg)
            return InternshipsUtils.apply(id, arg)
        except Exception as error:
            pass


commentParser = internships_api.parser()
commentParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')
@internships_api.route('/internships/<int:id>/comments')
class CommentInternship(Resource):
    internship_comment = InternshipsAPI.internship_comment

    @jwt_required()
    @internships_api.doc("internship comment", response = {
        400: "internship not found",
        400: "user not found",

                   
    })
    @internships_api.expect(commentParser, internship_comment, validate=True)
    def post(self, id):
        try:
            data = request.get_json()
            print(data)
            return InternshipsUtils.comment(id, data)
        except Exception as error:
            return "error", 500


appliedfor_parser = reqparse.RequestParser()
appliedfor_parser.add_argument('Authorization', location='headers', help='Bearer [Token]',
                               default='Bearer xxxxxxxxxxxxx')


@internships_api.route('/internships/appliedfor')
class AppliedForInternship(Resource):

    @jwt_required()
    @internships_api.expect(appliedfor_parser)
    @internships_api.doc("applied internship", response={
        400:"user not found",
        400:"internship not found"
    })
    def get(self):
        # arg = request.get_json()
        uid = get_jwt_identity()
        arg = request.args
        return InternshipsUtils.appliedfor(uid, arg)


saveParser = internships_api.parser()
saveParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')

savePostParser = internships_api.parser()
savePostParser.add_argument('internship_id')


@internships_api.route('/internships/save')
class SaveInternship(Resource):
    @jwt_required()
    @internships_api.expect(saveParser, validate=True)
    @internships_api.doc("get internship save list", response={
        400:"user not found",
        400:"internship not found",
        200:"save sucessfullt"
    })
    def get(self):
        uid = get_jwt_identity()
        return InternshipsUtils.getSaveList(uid)

    @jwt_required()
    @internships_api.expect(saveParser, savePostParser)
    @internships_api.doc("save  internship list", response={
        200:"save sucessfully",
        404: "Internship not found"
    })
    def post(self):
        arg = request.get_json()
        uid = get_jwt_identity()
        return InternshipsUtils.saveInternship(arg, uid)


@internships_api.route('/internships/unsave')
class UnsaveInternship(Resource):
    @jwt_required()
    @internships_api.doc("internship history", response = {
       400: "Internship not found",
       
    })
    @internships_api.expect(saveParser, validate=True)
    def post(self):
        arg = request.get_json()
        uid = get_jwt_identity()
        return InternshipsUtils.unSaveInternship(arg, uid)


@internships_api.route('/internships/history')
class GetViewedInternships(Resource):
    @jwt_required()
    @internships_api.doc("internship history", response = {
       400: "Internship not found",

    })
    @internships_api.expect(saveParser, validate=True)
    def get(self):
        uid = get_jwt_identity()
        return InternshipsUtils.getViewedHistory(uid)


@internships_api.route('/internships/calendar')
class InternshipCalendar(Resource):
    internship_calendar = InternshipsAPI.internship_calendar

    @jwt_required()
    @internships_api.expect("add calendar", response = {
        200:"Success"
    })
    @internships_api.expect(saveParser, internship_calendar)
    def post(self):
        arg = request.get_json()
        uid = get_jwt_identity()
        return InternshipsUtils.addCalendar(arg, uid)


@internships_api.route('/internships/uncalendar')
class InternshipCalendar(Resource):
    @jwt_required()
    @internships_api.expect(saveParser)
    def post(self):
        arg = request.get_json()
        uid = get_jwt_identity()
        return InternshipsUtils.deleteCalendar(arg, uid)


@internships_api.route('/events')
class Events(Resource):
    @jwt_required()
    @internships_api.expect(saveParser)
    def get(self):
        uid = get_jwt_identity()
        return InternshipsUtils.getCalendar(uid)


recommendParser = internships_api.parser()
recommendParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')
recommendParser.add_argument('type', help='recommend/new/closing')


@internships_api.route('/internships/recommend')
class Recommend(Resource):
    @internships_api.expect("get recoomend", response = {
        200:"No related student"
    })
    @internships_api.expect(recommendParser, validate=True)
    @jwt_required()
    def get(self):
        arg = request.args
        print(arg)
        return InternshipsUtils.getRecommend(arg)
