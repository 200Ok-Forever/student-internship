from operator import mod, pos
from re import L, S
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from flask_restx import Resource
from pkg_resources import resource_listdir
from .company_page_model import CompanyPageAPI
from .company_page_utils import CompanyPageUtils
from  ...Models import company as Company
from ...Helpers.other_util import convert_object_to_dict, convert_model_to_dict
from ... import db
from flask_jwt_extended import jwt_required
from flask import request
from flask_restx import Resource, reqparse
from fuzzywuzzy import process
from sqlalchemy import or_
from datetime import datetime
from difflib import SequenceMatcher
from sqlalchemy import func

company_ns = CompanyPageAPI.company_ns

@company_ns.route("/<id>")
class GetCompany(Resource):

    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    def get(self, id):
        movie = db.session.query(Company.Companies).filter(Company.Companies.id == id).first()
        if movie == None:
            return {"message": "Invalid movie id"}, 400

        data = convert_object_to_dict(movie)
        industry = convert_model_to_dict(movie.industries)
        data['industries'] = industry
        return data, 200
    """
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    @company_ns.expect(CompanyPageAPI.company_data, validate=True)
    def post(self, id):
        data = company_ns.payload
        uid = get_jwt_identity()
        query = db.session.query(Company.Company).filter(Company.Company.id == id)
        
        # 1. check company id
        company = query.first()
        if company== None:
            return {"message": "Invalid company id"}, 400
        # 2. check permission : is recuiter and belongs to this company
        if company.user_id != uid:
            return {"message": "No permission"}, 400
        
        # 3. update
        company.email = data['email']
        company.name = data['company_name']
        company.first_name = data['first_name']
        company.last_name = data['last_name']
        company.industry = data['industry']
        company.linkedin = data['linkedin']
        company.company_url = data['company_url']
        company.founded_year = data['founded_year']
        company.company_size = data['company_size']
        company.location = data['location']
        company.description = data['description']
        #query.update(data, synchronize_session = False)

        db.session.commit()
        return {"message": "Successfully"}, 200
    """

    """
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    #@jwt_required()
    def delete(self, id):
        #uid = get_jwt_identity()
        movie = db.session.query(model.Company).filter(model.Company.id == id).first()
        if movie == None:
            return {"message": "Invalid company id"}, 400
        db.session.delete(movie)
        db.session.commit()
        return {"message": "Successfully"}, 200
    """