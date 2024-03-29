from concurrent.futures import process
from multiprocessing.dummy import Process
from flask_jwt_extended import get_jwt_identity
from flask_restx import Resource
from .company_page_model import CompanyPageAPI
from .company_page_utils import check_editapplication_permison, search_jobs, create_job, find_file, format_jobs, formate_application
from ...Models import company as Company
from ...Models import model
from ...Models import internship as Internship
from ...Models import skill as Skill
from ...Helpers.other_util import convert_object_to_dict, convert_model_to_dict
from ... import db
from flask_jwt_extended import jwt_required
from sqlalchemy.sql import exists
from flask_restx import Resource, reqparse
from sqlalchemy import or_, and_
from sqlalchemy import func
from sqlalchemy.orm import aliased

company_ns = CompanyPageAPI.company_ns
authParser = company_ns.parser()
authParser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxxxx')

def get_location(data):
    city = model.City.query.filter_by(id=data).first()
    if city:
        return city.name
    else:
        return ""

# --------------------------------COMPANY OPERATOR-----------------------
@company_ns.route("/<companyid>")
class GetCompany(Resource):

    @company_ns.doc(
        "Get the information of the company of the given id",
        responses={
            200: "Get info Successfuly",
            400: "Invalid company id",
        }
    )
    def get(self, companyid):
        """ Get the information of the company of the given id """
        company = db.session.query(Company.Companies).filter(Company.Companies.id == companyid).first()
        if company == None:
            return {"message": "Invalid company id"}, 400

        data = convert_object_to_dict(company)
        industry = convert_model_to_dict(company.industries)
        data['industries'] = industry
        return data, 200

    @jwt_required()
    @company_ns.expect(authParser, CompanyPageAPI.company_data, validate=True)
    @company_ns.doc(
        "Update the infomation of the given company",
        responses={
            200: "Update Successfuly",
            400: "Invalid company id/No permission/Error when update",
        }
    )
    def post(self, companyid):
        """Update the infomation of the given company"""
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
    @company_ns.doc(
        "Delete the given Internship",
        responses={
            200: "Update Successfuly",
            400: "Invalid internship id/No permission",
        }
    )
    @jwt_required()
    def delete(self, jobid):
        """ Delete the given Internship """
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


@company_ns.route("/<companyid>/jobs")
class CompanyJobs(Resource):
    @company_ns.doc(
        "Get all the release internships of this given company",
        responses={
            200: "Successfuly",
            400: "Error",
        }
    )
    @jwt_required(optional=True)
    def get(self, companyid):
        """ Get all the release internships of this given company"""
        parser = reqparse.RequestParser()
        parser.add_argument('searchTerm', type=str, location='args')
        parser.add_argument('sort', type=str, choices=['closing', 'newest'], location='args', default='newest')
        parser.add_argument('current_page', type=int, location='args', default=1)
        parser.add_argument('location', type=str, location='args')
        args = parser.parse_args()

        uid = get_jwt_identity()
        jobs = search_jobs(args, companyid)
        if len(jobs) == 0:
            return {"jobs": [], 'company_name': None, 'company_logo': None, 'numAllResults': 0}

        return    format_jobs(jobs, uid, None, None), 200


@company_ns.route("/<jobid>/applicant")
class GetAllApplications(Resource):
    @company_ns.doc(
        "Get all applications of this internship",
        responses={
            200: "Successfuly",
            400: "Invalid internship id/No permissio",
        }
    )
    @jwt_required()
    def get(self, jobid):
        """ Get all applications of this internship """
        def get_location(data):
            city = model.City.query.filter_by(id=data).first()
            if city:
                return city.name
            else:
                return ""

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
        applis = db.session.query(model.InternshipStatus).filter(model.InternshipStatus.is_applied == "True", model.InternshipStatus.intern_id == jobid
        ).order_by(model.InternshipStatus.applied_time.desc()).all()
        print(applis)
        result = []
        for appli in applis:
            if appli.is_applied != "True":
                continue
            stu = appli.student
            if not stu: 
                continue
            data = formate_application(appli, stu, jobid)
            result.append(data)
        
        processe = job.processes
        processe.sort(key=lambda x: x.order)
        processes = [pro.name for pro in processe]
        return {'applicants': result, "intern_title": job.title, "city": get_location(job.city), "processes": processes}, 200


@company_ns.route("/<companyid>/create-job")
class CreateIntern(Resource):
    @company_ns.doc(
        "Realse a new internship",
        responses={
            200: "Create Successfuly",
            400: "Invalid company id/No permission/ Something wrong when create",
        }
    )
    @company_ns.expect(CompanyPageAPI.intern_data, validate=True)
    @jwt_required()
    def post(self, companyid):
        """ Realse a new internship """
        data = company_ns.payload
        print(data)
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
        try:
            new_intern = create_job(data, None, companyid, [])  
            print(new_intern.id)
        except:
           db.session.rollback()
           return {"message": "Something wrong"}, 400
        return {"message": "Successfuly"}, 200


@company_ns.route("/<jobid>/edit")
class CreateIntern(Resource):
    @company_ns.expect(CompanyPageAPI.intern_data, validate=True)
    @jwt_required()
    @company_ns.doc(
        "Edit an existing internship",
        responses={
            200: "Create Successfuly",
            400: "Invalid internship id/No permission/ Something wrong when update",
        }
    )
    def put(self, jobid):
        """ Edit an existing internship"""
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
    @jwt_required()
    @company_ns.doc(
        "Get the top 6 matched students with the internship's skills",
        responses={
            200: "Successfuly",
            400: "Invalid internship id/No permission",
        }
    )
    def get(self, jobid):
        """ Get the top 6 matched students with the internship's skills """
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
        InSta = aliased(model.InternshipStatus)
        query = db.session.query(model.Student, Skill.Skill, Skill.StudentSkills
        # join the stuudent , skill, studentskill
        ).filter(model.Student.id == Skill.StudentSkills.student_id, Skill.Skill.id == Skill.StudentSkills.skill_id
        ).filter(
        # get the pending applicant
        or_(~ exists().where(model.InternshipStatus.uid==model.Student.id, model.InternshipStatus.intern_id==jobid),and_(InSta.intern_id == jobid, InSta.uid == model.Student.id, InSta.is_applied == 'False'))
        ).filter(Skill.Skill.id.in_(skills_id))
        # get the skill that the job needs
        

        top6 = query.group_by(model.Student.id).order_by(func.count(model.Student.id).desc()).limit(6)
        stu_skills = query.order_by(model.Student.id).all()
        result = []
        for data in top6:
            student = data[0]
            info = convert_object_to_dict(student)
            info['avatar'] = student.user.avatar
            stu_skills = query.filter(model.Student.id == student.id).all()

            skills = [skill[1].name for skill in stu_skills]
            info['match'] = skills
            result.append(info)
        return {"result": result, "intern_title": job.title, "city": get_location(job.city) }, 200


# --------------------------------MANAGE THE APPLICATION-----------------------
@company_ns.route("/<jobid>/<appliedid>/shortlist")
class AddShortList(Resource):
    @jwt_required()
    @company_ns.doc(
        "Add the given application into shortlist",
        responses={
            200: "Successfuly",
            400: "Invalid internship id/No permission/Application id invalid",
        }
    )
    def post(self, jobid, appliedid):
        """ Add the given application into shortlist """
        uid = get_jwt_identity()

        valid, data = check_editapplication_permison(jobid, appliedid, uid)

        if not valid:
            return data, 400

        # set the shortlist to true
        data.shortlist = True
        db.session.commit()
        data = formate_application(data, data.student, jobid)
        return data, 200



@company_ns.route("/<jobid>/<appliedid>/unshortlist")
class AddShortList(Resource):
    @company_ns.doc(
        "Remove the given application from shortlist",
        responses={
            200: "Successfuly",
            400: "Invalid internship id/No permission/Application id invalid",
        }
    )
    @jwt_required()
    def post(self, jobid, appliedid):
        """ Remove the given application from shortlist """
        uid = get_jwt_identity()

        valid, data = check_editapplication_permison(jobid, appliedid, uid)

        if not valid:
            return data, 400

        # set the shortlist to true
        data.shortlist = False
        db.session.commit()
        data = formate_application(data, data.student, jobid)
        return data, 200



@company_ns.route("/<jobid>/<appliedid>/forward")
class ForwardProcess(Resource):
    @company_ns.doc(
        "Forward the stage of the given application",
        responses={
            200: "Successfuly",
            400: "Invalid internship id/No permission/Application id invalid",
        }
    )
    @jwt_required()
    def post(self, jobid, appliedid):
        """ Forward the stage of the given application """
        uid = get_jwt_identity()
        valid, data = check_editapplication_permison(jobid, appliedid, uid)

        if not valid:
            return data, 400

        # set short list
        data.shortlist = False

        # forward
        curr_process = data.process

        processes = db.session.query(Internship.Process).filter(Internship.Process.intern_id == jobid).order_by(Internship.Process.order.asc()).all()
        if processes == None:
            return {"message": "Successfully"}, 200

        # none, set to first order 
        if not curr_process:
            data.process = processes[0]
        else:
            # forward
            # check is the last one
            curr_order = processes.index(curr_process)
            if curr_order < len(processes) - 1:
                data.process = processes[curr_order + 1]
            elif curr_order == len(processes) - 1:
                data.status = "accepted"

        db.session.commit()
        data = formate_application(data, data.student, jobid)
        return data, 200



@company_ns.route("/<jobid>/<appliedid>/reject")
class Accept(Resource):
    @company_ns.doc(
        "Reject the given application",
        responses={
            200: "Successfuly",
            400: "Invalid internship id/No permission/Application id invalid",
        }
    )
    @jwt_required()
    def post(self, jobid, appliedid):
        """ Reject the given application """
        uid = get_jwt_identity()
        valid, data = check_editapplication_permison(jobid, appliedid, uid)
        
        if not valid:
            return data, 400

        #  check the applicant status
        if data.is_applied != 'True':
            return {"message": "Not applied yet"}, 400

        # update data
        data.status = 'rejected'
        print(data.status)
        db.session.commit()
        data = formate_application(data, data.student, jobid)
        return data, 200
