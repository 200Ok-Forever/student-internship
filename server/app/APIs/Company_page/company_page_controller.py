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
from ...Models import skill as Skill
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
        query = db.session.query(Company.Companies).filter(Company.Companies.id == id)
        
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
        jobs = db.session.query(model.Internship
        ).filter(model.Internship.company_id == id, or_(model.Internship.title.ilike(search), model.Internship.description.ilike(search)))
    else:
        jobs = db.session.query(model.Internship).filter(model.Internship.company_id == id)
    
    # for locatiom
    if args['location'] != None:
        location = search = "%{}%".format(args['location'])
        jobs = jobs.filter(model.City.name.ilike(location),model.City.id == model.Internship.city)

    # sort
    if args['sort'] == 'newest':
        jobs = jobs.order_by(model.Internship.posted_time.desc())
    else:
        jobs = jobs.order_by(model.Internship.expiration_datetime_utc.desc())
    
    # paging, 10 per page
    jobs = jobs.offset((args['current_page'] - 1) * 10).limit(10).all()
    
    return jobs


@company_ns.route("/<jobid>/applicant")
class GetAllApplications(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def get(self, jobid):
        uid = get_jwt_identity()

        # 1. check internship id
        query = db.session.query(model.Internship).filter(model.Internship.job_id == jobid)
        job = query.first()
        if job == None:
            return {"message": "Invalid internship id"}, 400

        # 2. check permission
        if job.company.user_id != uid:
            return {"message": "No permission"}, 400

        # 3. get all applications
        students = db.session.query(model.Student, model.InternshipStatus).filter(
        model.InternshipStatus.is_applied == 'True', model.InternshipStatus.intern_id == jobid, 
        model.InternshipStatus.uid == model.Student.id,
        model.InternshipStatus.status == 'pending').all()
        print(students)
        result = []
        for stu, app in students:
            data = convert_object_to_dict(stu)
            data['status'] = app.status
            data['questions'] = {}
            answers = db.session.query(Internship.InternAnswer, Internship.InternQuestion
            ).filter(Internship.InternAnswer.student_id == stu.id, Internship.InternQuestion.inetrn_id == jobid,
            Internship.InternQuestion.id == Internship.InternAnswer.question_id
            ).all()
            for que, ans in answers:
                data['questions'][que.content] = ans.answer
            result.append(data)
        return {'applicant': result}, 200

@company_ns.route("/<jobid>/<appliedid>/reject")
class Accept(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def post(self, jobid, appliedid):
        uid = get_jwt_identity()

        # 1. check applicant 
        query = db.session.query(model.InternshipStatus).filter(model.InternshipStatus.id == appliedid)
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
    @jwt_required()
    def post(self, companyid):
        now = datetime.now()
        data = company_ns.payload
        uid = get_jwt_identity()

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
                new_que = Internship.InternQuestion(intern.job_id, que)
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
    @jwt_required()
    def put(self, jobid):
        data = company_ns.payload
        uid = get_jwt_identity()

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

@company_ns.route("/<jobid>/recommendation")
class Recomendation(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def get(self, jobid):
        uid = get_jwt_identity()
        query = db.session.query(model.Internship).filter(model.Internship.job_id == jobid)
        
        # 1. check company id
        job = query.first()
        if job== None:
            return {"message": "Invalid internship id"}, 400
        # 2. check permission : is recuiter and belongs to this company
        if job.company.user_id != uid:
            return {"message": "No permission"}, 400

        # 3. recomendation
        job_skills = job.skills
        jobs_id = [skill.id for skill in job_skills]

        query = db.session.query(model.Student, Skill.Skill, Skill.StudentSkills, model.InternshipStatus
        # join the stuudent , skill, studentskill
        ).filter(model.Student.id == Skill.StudentSkills.student_id, Skill.Skill.id == Skill.StudentSkills.skill_id, 
        # get the pending applicant
        model.InternshipStatus.intern_id == jobid, model.InternshipStatus.uid == model.Student.id, model.InternshipStatus.is_applied == 'True', model.InternshipStatus.status == 'pending',
        # get the skill that the job needs
        model.Skill.id.in_(jobs_id))
        
        top6 = query.group_by(model.Student.id).order_by(func.count(model.Student.id).desc()).limit(6).all()
        print(top6)
        stu_skills = query.order_by(model.Student.id).all()
        result = []
        for data in top6:
            student = data[0]
            info = convert_object_to_dict(student)
            stu_skills = query.filter(model.Student.id == student.id).all()

            skills = [skill[1].name for skill in stu_skills]
            info['match'] = skills
            result.append(info)

        """
        data = {}
        ratio_list = []
        for stu in students:
            ratio = SequenceMatcher(None, stu.description.lower(), job.description.lower()).ratio()
            ratio_list.append(ratio)
            if str(ratio) not in data.keys():
                data[str(ratio)] = [stu]
            else:
                data[str(ratio)].append(stu)
    
        ratio_list.sort()
        ratio_list.reverse()
        result = []
        num = 0
        index = 0
        while num < 6:
            if index >= len(ratio_list):
                break
            students = data[str(ratio_list[index])]
            result += students
            num+=len(students)
            index+=1
            if num >= 6:
                break
        """

        return {"reault": result}, 200
