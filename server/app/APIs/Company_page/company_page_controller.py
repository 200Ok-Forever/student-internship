from email.mime import application
from operator import mod, pos
from re import L, S
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from flask_restx import Resource
from pkg_resources import resource_listdir
from .company_page_model import CompanyPageAPI
from .company_page_utils import get_intern_process, check_editapplication_permison, search_jobs, create_job, find_file, format_jobs
from ...Models import company as Company
from ...Models import model
from ...Models import internship as Internship
from ...Models import skill as Skill
from ...Helpers.other_util import convert_object_to_dict, convert_model_to_dict
from ... import db
from flask_jwt_extended import jwt_required
from flask import request, redirect
from flask_restx import Resource, reqparse
from fuzzywuzzy import process
from sqlalchemy import or_
from datetime import datetime
from difflib import SequenceMatcher
from sqlalchemy import func

company_ns = CompanyPageAPI.company_ns


# --------------------------------COMPANY OPERATOR-----------------------
@company_ns.route("/<id>")
class GetCompany(Resource):

    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    def get(self, id):
        company = db.session.query(Company.Companies).filter(Company.Companies.id == id).first()
        if company == None:
            return {"message": "Invalid company id"}, 400

        data = convert_object_to_dict(company)
        industry = convert_model_to_dict(company.industries)
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
        if company == None:
            return {"message": "Invalid company id"}, 400
        # 2. check permission : is recuiter and belongs to this company
        if company.id != uid:
            return {"message": "No permission"}, 400

        # 3. update
        try:
            #company.email = data['email']
            company.name = data['company_name']
            company.first_name = data['first_name']
            company.last_name = data['last_name']
            company.linkedin = data['linkedin']
            company.company_url = data['company_url']
            company.founded_year = data['founded_year']
            company.company_size = data['company_size']
            company.country = data['country']
            company.city = data['city']
            company.line1 = data['line1']
            company.description = data['description']
            company.company_logo = data['company_logo']

            old_industry_list = company.industries
            industry_name_list = [ind.name for ind in old_industry_list]
            new_industry_list = [new for new in data['industry'] if new not in industry_name_list]
            print(new_industry_list)
            # update industry
            for new in new_industry_list:
                curr_ind = db.session.query(Company.Industry).filter(Company.Industry.name == new).first()
                # only add the relationship
                if curr_ind != None:
                    company.industries.append(curr_ind)
                # add new industry
                elif curr_ind == None:
                    new_ind = Company.Industry(new)
                    db.session.add(new_ind)
                    company.industries.append(new_ind)
                        

            #remove industry
            delete_industry_list = [old for old in industry_name_list if old not in data['industry']]
            print(delete_industry_list)
            for ind in delete_industry_list:
                curr_ind = db.session.query(Company.Industry).filter(Company.Industry.name == ind).first()
                if curr_ind != None:
                    company.industries.remove(curr_ind)
            db.session.commit()

        except:
            return {"message": "Sth Error"}, 400

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


# --------------------------------INTERN OPERATOR-----------------------
@company_ns.route("/jobs/<jobid>")
class JobsManager(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def delete(self, jobid):
        jobid = int(jobid)
        uid = get_jwt_identity()
        # 1. check internship id
        query = db.session.query(model.Internship).filter(model.Internship.id == jobid)
        job = query.first()
        if job == None:
            return {"message": "Invalid internship id"}, 400

        # 2. check permission
        if job.company.id != uid:
            return {"message": "No permission"}, 400

        company_name = job.company.company_name
        company_logo = job.company.company_logo

        # 3. delete
        # delete process:
        for pro in job.processes:
            db.session.delete(pro)
        # delete question
        for que in job.questions:
            db.session.delete(que)

        db.session.delete(job)
        db.session.commit()

        jobs = db.session.query(model.Internship).filter(model.Internship.company_id == uid).all()
        return format_jobs(jobs, uid, company_logo, company_name), 200


@company_ns.route("/<id>/jobs")
class CompanyJobs(Resource):

    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required(optional=True)
    def get(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('searchTerm', type=str, location='args')
        parser.add_argument('sort', type=str, choices=['closing', 'newest'], location='args', default='newest')
        parser.add_argument('current_page', type=int, location='args', default=1)
        parser.add_argument('location', type=str, location='args')
        args = parser.parse_args()

        uid = get_jwt_identity()
        jobs = search_jobs(args, id)
        if len(jobs) == 0:
            return {"jobs": [], 'company_name': None, 'company_logo': None, 'numAllResults': 0}

        return    format_jobs(jobs, uid, None, None), 200


@company_ns.route("/<jobid>/applicant")
class GetAllApplications(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def get(self, jobid):
        uid = get_jwt_identity()

        # 1. check internship id
        query = db.session.query(model.Internship).filter(model.Internship.id == jobid)
        job = query.first()

        if job == None:
            return {"message": "Invalid internship id"}, 400

        # 2. check permission
        if job.company.id != uid:
            return {"message": "No permission"}, 400

        # 3. get all applications
        print(job.status)
        result = []
        for appli in job.status:
            stu = appli.student
            if not stu: continue
            data = convert_object_to_dict(stu)
            data['status'] = appli.status
            data['avatar'] = stu.user.avatar
            data['applicationId'] = appli.id
            data['shortlist'] = appli.shortlist
            data['resume'] = find_file("resume", stu.id)
            data['coverletter'] = find_file('coverletter', stu.id)
            data['questions'] = {}
            answers = db.session.query(Internship.InternAnswer, Internship.InternQuestion
                                       ).filter(Internship.InternAnswer.student_id == stu.id,
                                                Internship.InternQuestion.intern_id == jobid,
                                                Internship.InternQuestion.id == Internship.InternAnswer.question_id
                                                ).all()
            for que, ans in answers:
                data['questions'][que.content] = ans.answer
            result.append(data)
        return {'applicant': result}, 200


@company_ns.route("/<companyid>/create-job")
class CreateIntern(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @company_ns.expect(CompanyPageAPI.intern_data, validate=True)
    @jwt_required()
    def post(self, companyid):
        data = company_ns.payload
        uid = get_jwt_identity()

        query = db.session.query(Company.Companies).filter(Company.Companies.id == companyid)

        # 1. check company id
        company = query.first()
        if company == None:
            return {"message": "Invalid company id"}, 400
        # 2. check permission : is recuiter and belongs to this company
        if company.id != uid:
            return {"message": "No permission"}, 400

        # 3. create
         #try:
        new_intern = create_job(data, None, companyid, [])  
        print(new_intern.id)
        #except:
        #   db.session.rollback()
        #   return {"message": "Something wrong"}, 400
        return {"message": "Successfuly"}, 200


@company_ns.route("/<jobid>/edit")
class CreateIntern(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @company_ns.expect(CompanyPageAPI.intern_data, validate=True)
    @jwt_required()
    def put(self, jobid):
        jobid = int(jobid)
        data = company_ns.payload
        uid = get_jwt_identity()

        query = db.session.query(model.Internship).filter(model.Internship.id == jobid)

        # 1. check company id
        job = query.first()
        if job == None:
            return {"message": "Invalid internship id"}, 400
        # 2. check permission : is recuiter and belongs to this company
        if job.company.id != uid:
            return {"message": "No permission"}, 400

        intern_id = job.id
        try:
            # 3. delete

            old_skills = job.skills
            # remove old skill
            delete_skills = [old for old in old_skills if old.name not in data['skills']]
            for skill in delete_skills:
                skill.internships.remove(job)
                print(skill)
            posted_time = job.posted_time
            company_id = job.company_id
            for que in job.questions:
                db.session.delete(que)
            for pro in job.processes:
                db.session.delete(pro)

            db.session.delete(job)
            db.session.flush()

            intern = create_job(data, intern_id, company_id, old_skills)

            intern.id = intern_id
            intern.posted_time = posted_time
            intern.company_id = company_id

            db.session.commit()
        except:
            db.session.rollback()
            return {"message": "Something wrong"}, 400
        return {"message": "Successfuly"}, 200


# --------------------------------RECOMMENDATION-----------------------
@company_ns.route("/<jobid>/recommendation")
class Recomendation(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def get(self, jobid):
        jobid = int(jobid)
        uid = get_jwt_identity()
        query = db.session.query(model.Internship).filter(model.Internship.id == jobid)

        # 1. check company id
        job = query.first()
        if job == None:
            return {"message": "Invalid internship id"}, 400
        # 2. check permission : is recuiter and belongs to this company
        if job.company.id != uid:
            return {"message": "No permission"}, 400

        # 3. recomendation
        job_skills = job.skills
        skills_id = [skill.id for skill in job_skills]

        query = db.session.query(model.Student, Skill.Skill, Skill.StudentSkills, model.InternshipStatus
        # join the stuudent , skill, studentskill
        ).filter(model.Student.id == Skill.StudentSkills.student_id, Skill.Skill.id == Skill.StudentSkills.skill_id,
        # get the pending applicant
        model.InternshipStatus.intern_id == jobid, model.InternshipStatus.uid == model.Student.id, model.InternshipStatus.is_applied == 'True', model.InternshipStatus.status == 'pending',
        # get the skill that the job needs
        Skill.Skill.id.in_(skills_id))
        top6 = query.group_by(model.Student.id).order_by(func.count(model.Student.id).desc()).limit(6).all()
        stu_skills = query.order_by(model.Student.id).all()
        result = []
        for data in top6:
            student = data[0]
            info = convert_object_to_dict(student)
            stu_skills = query.filter(model.Student.id == student.id).all()

            skills = [skill[1].name for skill in stu_skills]
            info['match'] = skills
            result.append(info)

        return {"reault": result}, 200


# --------------------------------MANAGE THE APPLICATION-----------------------
@company_ns.route("/<jobid>/<appliedid>/shortlist")
class AddShortList(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def post(self, jobid, appliedid):
        uid = get_jwt_identity()

        valid, data = check_editapplication_permison(jobid, appliedid, uid)

        if not valid:
            return data, 400

        # set the shortlist to true
        data.shortlist = True
        db.session.commit()
        return {"message": "Succussfully"}, 200


@company_ns.route("/<jobid>/<appliedid>/unshortlist")
class AddShortList(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def post(self, jobid, appliedid):
        uid = get_jwt_identity()

        valid, data = check_editapplication_permison(jobid, appliedid, uid)

        if not valid:
            return data, 400

        # set the shortlist to true
        data.shortlist = False
        db.session.commit()
        return {"message": "Succussfully"}, 200


@company_ns.route("/<jobid>/<appliedid>/forward")
class ForwardProcess(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def post(self, jobid, appliedid):
        uid = get_jwt_identity()
        valid, data = check_editapplication_permison(jobid, appliedid, uid)

        if not valid:
            return data, 400

        # set short list
        data.shortlist = False

        # forward
        curr_process = data.process

        # none or already the first
        if not curr_process or curr_process.order == 1:
            db.session.commit()
            return 200

        
        # forward
        last_order = curr_process.order - 1
        """
        previous = db.session.query(Internship.Process).filter(Internship.Process.intern_id == jobid, Internship.Process.order == last_order).first()
        if previous == None:
            return 400"""
        data.stage = last_order

        db.session.commit()
        return 200


@company_ns.route("/<jobid>/<appliedid>/reject")
class Accept(Resource):
    @company_ns.response(200, "Successfully")
    @company_ns.response(400, "Something wrong")
    @jwt_required()
    def post(self, jobid, appliedid):
        uid = get_jwt_identity()
        valid, data = check_editapplication_permison(jobid, appliedid, uid)
        
        if not valid:
            return data, 400

        #  check the applicant status
        if data.is_applied != 'True':
            return {"message": "Not applied yet"}, 400

        # update data
        data.status = 'reject'
        print(data.status)
        db.session.commit()
        return {"message": "Successfully"}, 200
