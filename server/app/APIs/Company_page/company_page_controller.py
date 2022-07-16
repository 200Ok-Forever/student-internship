from flask import request, jsonify
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
    @company_ns.expect(CompanyPageAPI.company_data, validate=True)
    def post(self, id):
        data = company_ns.payload
        movie = db.session.query(model.Company).filter(model.Company.id == id).first()
        if movie == None:
            return {"message": "Invalid movie id"}, 400
        
        movie.data = data
        db.session.commit()
        return {"message": "Successfully"}, 200

    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    def delete(self, id):
        movie = db.session.query(model.Company).filter(model.Company.id == id).first()
        if movie == None:
            return {"message": "Invalid company id"}, 400
        db.session.delete(movie)
        db.session.commit()
        return {"message": "Successfully"}, 200


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

@company_ns.route("/{id}/jobs")
class GetCompanyJobs(Resource):

    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def get(self, id):
        movie = db.session.query(model.Company).filter(
            model.Company.id == id).first()
        if movie == None:
            return {"message": "Invalid movie id"}, 400
        
        return convert_model_to_dict(movie.jobs), 200
