from  ...Models import company as Company
from  ...Models import model
from  ...Models import internship as Internship

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