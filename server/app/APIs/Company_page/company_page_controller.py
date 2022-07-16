from operator import pos
from re import L
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from flask_restx import Resource
from .company_page_model import CompanyPageAPI
from .company_page_utils import CompanyPageUtils
from  ...Models import model 
from ...Helpers.other_until import convert_object_to_dict, convert_model_to_dict
from ... import db
from flask_jwt import jwt_required, JWT
from flask import request
from flask_restx import Resource, reqparse

from sqlalchemy import or_
from datetime import datetime


company_ns = CompanyPageAPI.company_ns


@company_ns.route("/<id>")
class GetCompany(Resource):

    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    def get(self, id):
        movie = db.session.query(model.Company).filter(model.Company.id == id).first()
        if movie == None:
            return {"message": "Invalid movie id"}, 400

        return convert_object_to_dict(movie), 200
    
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    #@jwt_required()
    @company_ns.expect(CompanyPageAPI.company_data, validate=True)
    def post(self, id):
        data = company_ns.payload
        #uid = get_jwt_identity()
        uid = 4
        query = db.session.query(model.Company).filter(model.Company.id == id)
        
        # 1. check company id
        company = query.first()
        if company== None:
            return {"message": "Invalid company id"}, 400
        # 2. check permission : is recuiter and belongs to this company
        if company.user_id != uid:
            return {"message": "No permission"}, 400
        
        # 3. update
        query.update(data, synchronize_session = False)

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


@company_ns.route("/<id>/jobs")
class GetCompanyJobs(Resource):

    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    def get(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('searchString', type=str, location='args', required=True)
        parser.add_argument('location', type=str, location='args')
        #TODO: choices
        parser.add_argument('sort', type=str, location='args', default='newest')
        args = parser.parse_args()

        search = "%{}%".format(args['searchString'])
        jobs = None
        if args['location'] == None:
            jobs = db.session.query(model.Internship).filter(model.Internship.company_id == id, or_(model.Internship.title.ilike(search), model.Internship.description.ilike(search)))
        else:
            #TODO:
            location = search = "%{}%".format(args['location'])
            jobs = db.session.query(model.Internship).filter(model.Internship.company_id == id, or_(model.Internship.title.ilike(search), model.Internship.description.ilike(search)))
        
        if args['sort'] == 'newest':
            jobs = jobs.order_by(model.Internship.posted_time.desc())
        else:
            jobs = jobs.order_by(model.Internship.expiration_datetime_utc.desc())
        if jobs.all() == []:
            return {"message": "Invalid company id"}, 400
    
        result = []
        for job in jobs:
            data = convert_object_to_dict(job)

            data['status'] = ''
            data['numAllResults'] = {"total_count": len(job.company.jobs)}
            result.append(data)

        return {"jobs":result}, 200

@company_ns.route("/jobs/<jobid>")
class CompanyJobManager(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    #@jwt_required()
    def delete(self, jobid):
        # uid = get_jwt_identity()
        uid = 4
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

@company_ns.route("/<jobid>/applicant")
class GetAllApplications(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    #@jwt_required()
    def get(self, jobid):
        # uid = get_jwt_identity()
        uid = 3

        # 1. check internship id
        query = db.session.query(model.Internship).filter(model.Internship.job_id == jobid)
        job = query.first()
        if job == None:
            return {"message": "Invalid internship id"}, 400

        # 2. check permission
        if job.company.user_id != uid:
            return {"message": "No permission"}, 400

        # 3. get all applications
        applications = db.session.query(model.Application).filter(model.Application.intership_id == jobid, model.Application.is_applied == 'True').all()
        print(applications)

        return {'applicant': convert_model_to_dict(applications)}, 200

@company_ns.route("/<jobid>/<appliedid>/accept")
class Accept(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    #@jwt_required()
    def post(self, jobid, appliedid):
        # uid = get_jwt_identity()
        uid = 3

        # 1. check applicant 
        query = db.session.query(model.Application).filter(model.Application.id == appliedid)
        appli = query.first()
        if appli == None:
            return {"message": "Invalid applicant id"}, 400
        
        # 2. check permission
        intern = db.session.query(model.Internship).filter(model.Internship.job_id == appli.intership_id).first()
        if intern.company.user_id != uid:
            return {"message": "No permission"}, 400
        
        # 3. check the applicant status
        if appli.is_applied != 'True':
            return {"message":"Not applied yet"}, 400

        # update data
        appli.status = 'accepted'
        print(appli.status)
        db.session.commit()
        return {"message": "Successfully"}, 200

@company_ns.route("/<jobid>/<appliedid>/reject")
class Accept(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    #@jwt_required()
    def post(self, jobid, appliedid):
        # uid = get_jwt_identity()
        uid = 3

        # 1. check applicant 
        query = db.session.query(model.Application).filter(model.Application.id == appliedid)
        appli = query.first()
        if appli == None:
            return {"message": "Invalid applicant id"}, 400
        
        # 2. check permission
        intern = db.session.query(model.Internship).filter(model.Internship.job_id == appli.intership_id).first()
        if intern.company.user_id != uid:
            return {"message": "No permission"}, 400
        
        # 3. check the applicant status
        if appli.is_applied != 'True':
            return {"message":"Not applied yet"}, 400

        # update data
        appli.status = 'reject'
        print(appli.status)
        db.session.commit()
        return {"message": "Successfully"}, 200

@company_ns.route("/<companyid>/create-job")
class CreateIntern(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @company_ns.expect(CompanyPageAPI.intern_data, validate=True)
    #@jwt_required()
    def post(self, companyid):
        now = datetime.now()
        data = company_ns.payload
        # uid = get_jwt_identity()
        uid = 3

        query = db.session.query(model.Company).filter(model.Company.id == companyid)
        
        # 1. check company id
        company = query.first()
        if company== None:
            return {"message": "Invalid company id"}, 400
        # 2. check permission : is recuiter and belongs to this company
        if company.user_id != uid:
            return {"message": "No permission"}, 400

        # 3. create
        try:
            # create question
            intern = model.Internship(data['job_title'], data['closed_date'], data['location'], data['salary_currency'], data['min_salary'], data['max_salary'], data['is_remote'], data['job_type'], data['description'])
            intern.company_id = companyid
            intern.posted_time = str(now)
            db.session.add(intern)
            db.session.flush()

            if data['application']['resume']:
                intern.require_resume = 1
            else:
                intern.require_resume = 0
            if data['application']['coverLetter']:
                intern.require_coverLetter = 1
            else:
                intern.require_coverLetter = 0


            for que in data['application']['questions']:
                new_que = model.Question(intern.job_id, que)
                db.session.add(new_que)
                db.session.flush()
        
            # recruiting_process 
            order = 1
            for pro in data['recruiting_process']:
                new_pro = model.Process(intern.job_id, order, pro)
                order+=1
                db.session.add(new_pro)
                db.session.flush()
            db.session.commit()
        except:
            db.session.rollback()
            return {"message": "Something wrong"}, 400
        return {"message": "Successfuly"}, 200


@company_ns.route("/<jobid>/edit")
class CreateIntern(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @company_ns.expect(CompanyPageAPI.intern_data, validate=True)
    #@jwt_required()
    def put(self, jobid):
        data = company_ns.payload
        # uid = get_jwt_identity()
        uid = 3

        query = db.session.query(model.Internship).filter(model.Internship.job_id == jobid)
        
        # 1. check company id
        job = query.first()
        if job== None:
            return {"message": "Invalid internship id"}, 400
        # 2. check permission : is recuiter and belongs to this company
        if job.company.user_id != uid:
            return {"message": "No permission"}, 400

        intern_id = job.job_id
        try:
            # 3. delete
            posted_time = job.posted_time
            company_id = job.company_id
            db.session.delete(job)
            db.session.flush()

            # 4. create
            # create question
            intern = model.Internship(data['job_title'], data['closed_date'], data['location'], data['salary_currency'], data['min_salary'], data['max_salary'], data['is_remote'], data['job_type'], data['description'])
            intern.job_id = intern_id
            intern.posted_time = posted_time
            intern.company_id = company_id
            db.session.add(intern)
            db.session.flush()

            if data['application']['resume']:
                intern.require_resume = 1
            else:
                intern.require_resume = 0
            if data['application']['coverLetter']:
                intern.require_coverLetter = 1
            else:
                intern.require_coverLetter = 0


            for que in data['application']['questions']:
                new_que = model.Question(intern.job_id, que)
                db.session.add(new_que)
                db.session.flush()
        
            # recruiting_process 
            order = 1
            for pro in data['recruiting_process']:
                new_pro = model.Process(intern.job_id, order, pro)
                order+=1
                db.session.add(new_pro)
                db.session.flush()
            db.session.commit()
        except:
            db.session.rollback()
            return {"message": "Something wrong"}, 400
        return {"message": "Successfuly"}, 200
