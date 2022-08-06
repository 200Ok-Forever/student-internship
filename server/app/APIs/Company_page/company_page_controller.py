from email.mime import application
from operator import mod, pos
from re import L, S
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from flask_restx import Resource
from pkg_resources import resource_listdir
from .company_page_model import CompanyPageAPI
from .company_page_utils import get_intern_process
from  ...Models import company as Company
from  ...Models import model
from  ...Models import internship as Internship
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
        company.require_resume = data['require_resume']
        company.require_coverLetter = data['require_coverLetter']
        #query.update(data, synchronize_session = False)

        db.session.commit()
        return {"message": "Successfully"}, 200


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
@company_ns.route("/jobs/<id>")
class JobsManager(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def delete(self, jobid):
        uid = get_jwt_identity()
        # 1. check internship id
        query = db.session.query(model.Internship).filter(model.Internship.job_id == jobid)
        job = query.first()
        if job == None:
            return {"message": "Invalid internship id"}, 400
        
        # 2. check permission
        if job.company.user_id != uid:
            return {"message": "No permission"}, 400

        # 3. delete
        db.session.delete(job)
        db.session.commit()
        return {"message": "Successfully"}, 200


@company_ns.route("/<id>/jobs")
class CompanyJobs(Resource):

    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required(optional=True)
    def get(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('searchTerm', type=str, location='args')
        parser.add_argument('sort', type=str, choices=['closing', 'newest'], location='args', default='newest')
        parser.add_argument('current_page', type=int, location='args', required=True, default=1)
        parser.add_argument('location', type=str, location='args')
        args = parser.parse_args()

        uid = get_jwt_identity()

        jobs = search_jobs(args, id)
        if len(jobs) == 0:
            return {"jobs": [], 'company_name': None, 'company_logo': None, 'numAllResults': 0}
            
        # format result
        result = {"jobs": []}
        result['numAllResults'] = {"total_count": len(jobs)}
        for job in jobs:
            company_name = job.company.company_name
            company_logo = job.company.logo
            data = convert_object_to_dict(job)
            # TODO: update database
            data['closeDate'] = data['expiration_datetime_utc']
            data['city'] = job.citys.name

            # get identity, if has token, is recruiter
            if uid != None:
                process_list = get_intern_process(job)
                data['processes'] = process_list
                data['require_resume'] = job.require_resume
                data['require_coverLetter'] = job.require_coverLetter
            result['jobs'].append(data)

        result['company_name'] = company_name
        result['company_logo'] = company_logo
        

        return result, 200

def search_jobs(args, id):
    # for search keyword
    if args['searchTerm'] != None:
        search = "%{}%".format(args['searchTerm'])
        jobs = db.session.query(Internship.Internship).filter(Internship.Internship.company_id == id, or_(Internship.Internship.title.ilike(search), Internship.Internship.description.ilike(search)))
    else:
        jobs = db.session.query(Internship.Internship).filter(Internship.Internship.company_id == id)
    
    # for locatiom
    if args['location'] != None:
        location = search = "%{}%".format(args['location'])
        jobs = jobs.filter(Internship.City.name.ilike(location),Internship.City.id == Internship.Internship.city)

    # sort
    if args['sort'] == 'newest':
        jobs = jobs.order_by(Internship.Internship.posted_time.desc())
    else:
        jobs = jobs.order_by(Internship.Internship.expiration_datetime_utc.desc())
    
    # paging, 10 per page
    jobs = jobs.offset((args['current_page'] - 1) * 10).limit(10).all()
    
    return jobs