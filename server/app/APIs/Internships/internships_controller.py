from email.policy import default
from flask import request, jsonify
from flask_restx import Resource,reqparse
from pyrsistent import get_in
from .internships_model import InternshipsAPI
from .internships_utils import InternshipsUtils
from flask_jwt_extended import jwt_required
from ...Models.model import Internship, InternshipSearchSchema
internships_api = InternshipsAPI.api

search_schema = InternshipSearchSchema()
search_internships = InternshipsAPI.search_internships
@internships_api.route('/internships')
class GetInternshipList(Resource):
  
    @internships_api.expect(search_internships)
    @internships_api.response(200, "Search successfully")
    @internships_api.response(400, "Something wrong")
    def get(self):

        args1 = request.args
    
        print(args1)
        return InternshipsUtils.get_all_Intership(args1)
 
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
