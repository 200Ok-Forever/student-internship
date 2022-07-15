from email.policy import default
from flask import request, jsonify
from flask_restx import Resource,reqparse
import jwt
from pyrsistent import get_in
from .internships_model import InternshipsAPI
from .internships_utils import InternshipsUtils
from flask_jwt_extended import create_access_token, jwt_required,unset_jwt_cookies
from ...Models.model import Internship, InternshipSearchSchema
internships_api = InternshipsAPI.api

search_schema = InternshipSearchSchema()
search_internships = InternshipsAPI.search_internships
@internships_api.route('/internships')
class GetInternshipList(Resource):
  
    @internships_api.expect(search_internships)
    @internships_api.response(200, "Search successfully")
    @internships_api.response(404, "Internships not found")
    def get(self):

        args1 = request.args
     
        try:
      
            return InternshipsUtils.get_all_Intership(args1)
        except Exception as error:
            return{
                "message": str(error)
            }, 500
 
@internships_api.route('/internships/<int:id>')
class GetInternship(Resource):
    get_internship=InternshipsAPI.internship_get
    @internships_api.doc("Get internship", responses={
        200: "success",
        404: "Internship not found!",
    })
    def get(self,id):
        try:
            return InternshipsUtils.get_Internship(id)
        except Exception as error:
            return{
                "message": error
            }, 500
    
    @internships_api.doc("Get internship", responses={
        200: "success",
        404: "Internship not found!",
    })
    def post(self,id):
        try:
            pass
        except Exception as error:
            pass

applyParser = internships_api.parser()
applyParser.add_argument('Authorization', location = 'headers',  help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')
@internships_api.route('/internships/<int:id>/apply')
class ApplyInternship(Resource):

    # @jwt_required()
    # @internships_api.expect(applyParser, validate=True)
    def post(self,id):
        try:
            
            arg = request.get_json()
            return InternshipsUtils.apply(arg)
            pass
        except Exception as error:
            pass

commentParser = internships_api.parser()
commentParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')
@internships_api.route('/internships/<int:id>/comments')
class CommentInternship(Resource):
    # @jwt_required()
    # @internships_api.expect(commentParser, validate=True)
    def post(self,id):
        try:
            data = request.get_json()
            print(data)
            return InternshipsUtils.comment(id, data)
        except Exception as error:
            pass


@internships_api.route('/internships/appliedfor')
class AppliedForInternship(Resource):

    def get(self):
        # arg = request.get_json()
        arg = request.args
        return InternshipsUtils.appliedfor(arg)


saveParser = internships_api.parser()
saveParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')
@internships_api.route('/internships/save')
class SaveInternship(Resource):
    # @jwt_required()
    # @internships_api.expect(commentParser, validate=True)
    def get(self):
        arg = request.args
        return InternshipsUtils.getSaveList(arg)
  
    def post(self):
        arg = request.get_json()
        print(arg)
        return InternshipsUtils.saveInternship(arg)

@internships_api.route('/internships/unsave')
class UnsaveInternship(Resource):
    def post(self):
        arg = request.get_json()
        print(arg)
        return InternshipsUtils.unSaveInternship(arg)

@internships_api.route('/internships/history')
class GetViewedInternships(Resource):
    def get(self):
        arg = request.args
        return InternshipsUtils.getViewedHistory(arg)