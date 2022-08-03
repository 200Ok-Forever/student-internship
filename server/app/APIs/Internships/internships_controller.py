from email.policy import default
from flask import request, jsonify
from flask_restx import Resource, reqparse
from pyrsistent import get_in
from .internships_model import InternshipsAPI
from .internships_utils import InternshipsUtils

from ...Models.model import Internship, InternshipSearchSchema
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity

internships_api = InternshipsAPI.api

search_schema = InternshipSearchSchema()
search_internships = InternshipsAPI.search_internships



searrch_parser = reqparse.RequestParser()
searrch_parser.add_argument('job',  location='args', help="search keyword")
searrch_parser.add_argument('location',  location='args', help = 'city location')
searrch_parser.add_argument('sort',  location='args', help = 'TRUE/FALSE')
searrch_parser.add_argument('paid',  location='args', help = 'TRUE/FALSE')
searrch_parser.add_argument('is_remote',  location='args', help = 'TRUE/FALSE')
searrch_parser.add_argument('job_type',  location='args')
searrch_parser.add_argument('current_page',  location='args')
@internships_api.route('/internships')
class GetInternshipList(Resource):

    # @internships_api.expect(search_internships)
    @internships_api.doc(body = searrch_parser)
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
get_internship_parser.add_argument('uid', location = 'args', help="pass uid if user log in")
@internships_api.route('/internships/<int:id>')
class GetInternship(Resource):
    get_internship = InternshipsAPI.internship_get

    @internships_api.doc("Get internship", responses={
        200: "success",
        404: "Internship not found!",
    })
    @internships_api.doc(body = get_internship_parser)
    def get(self, id):
        try:
            data = request.args
            # print(data)
            return InternshipsUtils.get_Internship(id, data)
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
    @internships_api.expect(internship_apply, applyParser)
    def post(self, id):
        try:

            arg = request.get_json()
            print(arg)
            return InternshipsUtils.apply(id, arg)
            pass
        except Exception as error:
            pass


commentParser = internships_api.parser()
commentParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')


@internships_api.route('/internships/<int:id>/comments')
class CommentInternship(Resource):
    internship_comment = InternshipsAPI.internship_comment

    @jwt_required()
    @internships_api.expect(commentParser, internship_comment, validate=True)
    def post(self, id):
        try:
            data = request.get_json()
            print(data)
            return InternshipsUtils.comment(id, data)
        except Exception as error:
            return "error", 500

appliedfor_parser = reqparse.RequestParser()
appliedfor_parser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')
@internships_api.route('/internships/appliedfor')
class AppliedForInternship(Resource):

    @internships_api.expect(appliedfor_parser)
    def get(self):
        # arg = request.get_json()
        arg = request.args
        return InternshipsUtils.appliedfor(arg)


saveParser = internships_api.parser()
saveParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')

savePostParser = internships_api.parser()
savePostParser.add_argument('internship_id')
@internships_api.route('/internships/save')
class SaveInternship(Resource):
    # @jwt_required()
    @internships_api.expect(saveParser, validate=True)
    def get(self):
        arg = request.args
        return InternshipsUtils.getSaveList(arg)

    @internships_api.expect(saveParser, savePostParser)
    def post(self):
        arg = request.get_json()
        print(arg)
        return InternshipsUtils.saveInternship(arg)


@internships_api.route('/internships/unsave')
class UnsaveInternship(Resource):

    @internships_api.expect(saveParser, validate=True)
    def post(self):
        arg = request.get_json()
        print(arg)
        return InternshipsUtils.unSaveInternship(arg)


@internships_api.route('/internships/history')
class GetViewedInternships(Resource):
    @internships_api.expect(saveParser, validate=True)
    def get(self):
        arg = request.args
        return InternshipsUtils.getViewedHistory(arg)


@internships_api.route('/internships/calendar')
class InternshipCalendar(Resource):
    internship_calendar = InternshipsAPI.internship_calendar
    @internships_api.expect(saveParser,internship_calendar)
    def post(self):
        arg = request.get_json()
        return InternshipsUtils.addCalendar(arg)
        pass
 
@internships_api.route('/internships/uncalendar')
class InternshipCalendar(Resource):
 
    @internships_api.expect(saveParser)
    def post(self):
        arg = request.get_json()
        return InternshipsUtils.deleteCalendar(arg)
        pass


@internships_api.route('/events')
class Events(Resource):
    @internships_api.expect(saveParser)
    def get(self):
        arg = request.args
        return InternshipsUtils.getCalendar(arg)


recommendParser = internships_api.parser()
recommendParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')
recommendParser.add_argument('type', help='recommend/new/closingsoon')
@internships_api.route('/internships/recommend')
class Recommend(Resource):
    @internships_api.expect(recommendParser, validate=True)
    @jwt_required()
    def get(self):
        arg = request.args
        print(arg)
        return InternshipsUtils.getRecommend(arg)


@internships_api.route('chat/users')
class GetUser(Resource):
    def get(self):
        return InternshipsUtils.getUser()