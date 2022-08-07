from signal import raise_signal
from  ...Models import company as Company
from  ...Models import model
from  ...Models import internship as Internship
from ... import db
from sqlalchemy import and_, null, or_

def get_intern_process(job):
    process = []
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
    #if job.company_id != uid:
     #   return False, {"message": "No permision"}
    

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
        jobs = jobs.order_by(model.Internship.expiration_datetime.desc())
    
    # paging, 10 per page
    jobs = jobs.offset((args['current_page'] - 1) * 10).limit(10).all()
    
    return jobs

def create_job(data, intern_id):
    try:
        intern = model.Internship( data['type'], data['title'],  data['apply_link'], data['is_remote'], \
        data['description'], data['google_link'], data['expiration_time'], data['min_salary'], \
        data['max_salary'], data['salary_currency'], data['application']['resume'], data['application']['coverLetter'])
        db.session.add(intern)
        db.session.flush()

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
        # city
        city_name = data['city']
        city = db.session.query(model.City).filter(model.City.name == city_name).first()
        # create new city
        if city == None:
            city = model.City(city_name)
        intern.city = city.id
        db.session.commit()
    except:
        raise
    return intern

def find_file(type, uid):
    file = db.session.query(model.File).filter(model.File.uid == uid, model.File.file_type == type).first()
    if file != None:
        file = str(file.decode())
    return file