from signal import raise_signal

from ...Helpers.other_util import convert_object_to_dict
from  ...Models import company as Company
from  ...Models import model
from  ...Models import internship as Internship
from  ...Models import skill as Skill
from ... import db
from sqlalchemy import or_

def get_intern_process(job):
    process = [-1 for i in range(0, len(job.processes))]
    for pro in job.processes:
        process[pro.order - 1] = pro.name
    return process

def get_application(job):
    print(job)
    applications = db.session.query(Internship.InternshipStatus).filter(Internship.InternshipStatus.intern_id == 1).all()
    print(applications)
    for app in applications:
        internship = app.internship

        data = {}
        data['application_id'] = app.id
        data['uid'] = app.uid
        data['status'] = app.status

        # questions and answer
        intern_answers = db.session.query(Internship.InternAnswer, Internship.InternQuestion
        ).filter(Internship.InternQuestion.intern_id == 1, Internship.InternQuestion.id == Internship.InternAnswer.question_id, \
            Internship.InternAnswer.student_id == app.uid).all()
        print(intern_answers)
        answers = {}
        for an, que in intern_answers:
            answers[que.content] = an.answer

        print(answers)

def check_editapplication_permison(jobid, appliedid, uid):
    # check the job id
    job = db.session.query(model.Internship).filter(model.Internship.id == jobid).first()

    if job == None:
        return False, {"message": "job id invalid"}

    # check permission
    if int(job.company_id) != int(uid):
        return False, {"message": "No permision"}
    

    # check the application id
    curr_app = None
    for appli in job.status:
        if appli.id == int(appliedid):
            curr_app = appli
            break
    if curr_app == None:
        return False, {"message": "application id invalid"}
    
    return True, curr_app

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
        jobs = jobs.order_by(model.Internship.expiration_datetime_utc.asc())
    
    # paging, 10 per page
    jobs = jobs.offset((args['current_page'] - 1) * 10).limit(10).all()
    
    return jobs

def create_job(data, intern_id, companyid, old_skills):
    #try:
    intern = model.Internship( data['type'], data['title'],  data['apply_link'], data['is_remote'], \
    data['description'], data['google_link'], data['expiration_time'], data['min_salary'], \
    data['max_salary'], data['salary_currency'], data['application']['resume'], data['application']['coverLetter'])
    intern.company_id = companyid
    db.session.add(intern)
    db.session.flush()

    # update internid
    if intern_id:
        intern.id = intern_id
        db.session.commit()
    # add question
    for que in data['application']['questions']:
        if intern_id:
            new_que = Internship.InternQuestion(que, intern_id)
        else:
            new_que = Internship.InternQuestion(que, intern.id)
        db.session.add(new_que)
        db.session.flush()

    # recruiting_process 
    order = 1
    for pro in data['recruiting_process']:
        if intern_id:
            new_pro = Internship.Process(pro, order, intern_id)
        else:
            new_pro = Internship.Process(pro, order, intern.id)
        order+=1
        db.session.add(new_pro)
        db.session.flush()
    # add new skill
    old_skills_name = [old.name for old in old_skills]
    new_skills = [new for new in data['skills'] if new not in old_skills_name]    
    print(old_skills)
    for skill in new_skills:
        curr_skill = db.session.query(Skill.Skill).filter(Skill.Skill.name == skill).first()
        # create
        if curr_skill == None:
            curr_skill = Skill.Skill(skill)
            db.session.add(curr_skill)
        intern.skills.append(curr_skill)

        
    # city
    city_name = data['city']
    print(city_name)
    city = db.session.query(model.City).filter(model.City.name == city_name).first()
    # create new city
    if city == None:
        city = model.City(city_name)
        db.session.add(city)
        db.session.commit()
        print(city)
    intern.city = city.id
    db.session.commit()
    print(intern.city)
    #except:
    #    raise
    return intern

def find_file(type, uid):
    file = db.session.query(model.File).filter(model.File.uid == uid, model.File.file_type == type).first()
    if file != None:
        return { 'data': file.data, 'name': file.filename }
    return None

def format_jobs(jobs, uid, company_logo, company_name):
    # format result
    result = {"jobs": []}
    result['numAllResults'] = {"total_count": len(jobs)}
    for job in jobs:
        company_name = job.company.company_name
        company_logo = job.company.company_logo
        data = convert_object_to_dict(job)
        data['closeDate'] = data['expiration_datetime_utc']

        # get the city
        if job.citys is None:
            data['city'] = None
        else:
            data['city'] = job.citys.name

        # get identity, if has token, is recruiter
        if uid != None and job.company_id == uid:
            process_list = get_intern_process(job)
            data['questions'] = [que.content for que in job.questions]
            data['processes'] = process_list
            data['require_resume'] = job.require_resume
            data['require_coverLetter'] = job.require_coverLetter
            data['nApplications'] = len(job.status)
            data['skills'] = [{ 'name': skill.name, 'id': skill.id} for skill in job.skills]
        result['jobs'].append(data)

    result['company_name'] = company_name
    result['company_logo'] = company_logo
    return result

def formate_application(appli, stu):
    data = convert_object_to_dict(stu)
    data['stage'] = None
    if appli.process != None:
        data['stage'] = appli.process.name
    data['status'] = appli.status
    data['avatar'] = stu.user.avatar
    data['applicationId'] = appli.id
    data['applicationTime'] = appli.applied_time
    data['shortlist'] = appli.shortlist
    data['resume'] = find_file("resume", stu.id)
    data['coverletter'] = find_file('coverletter', stu.id)
    data['questions'] = {}
    answers = db.session.query(Internship.InternAnswer, Internship.InternQuestion
                                ).filter(Internship.InternAnswer.student_id == stu.id,
                                        Internship.InternQuestion.intern_id == jobid,
                                        Internship.InternQuestion.id == Internship.InternAnswer.question_id
                                        ).all()
    for ans, que in answers:
        data['questions'][que.content] = ans.answer
    return data