from socket import inet_aton
from sys import intern
from sqlalchemy.ext.hybrid import hybrid_method
from torch import autocast_increment_nesting
from wtforms import Form, IntegerField, StringField, PasswordField, validators
from .. import bcrypt, db

"""
class InternshipStatus(db.Model):
    __tablename__ = 't_intern_user_status'
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey('t_student.id'))
    intern_id = db.Column(db.Integer, db.ForeignKey('t_internships.id'))
    is_seen = db.Column(db.VARCHAR(255))
    is_save = db.Column(db.VARCHAR(255))
    is_applied = db.Column(db.VARCHAR(255))
    status = db.Column(db.VARCHAR(255))
    seen_time = db.Column(db.TIMESTAMP)
    internship = db.relationship('Internship', back_populates='status')
"""


class InternQuestion(db.Model):
    __tablename__ = 't_intern_question'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    content = db.Column(db.VARCHAR(10000))
    intern_id = db.Column(db.Integer, db.ForeignKey('t_internships.id'))
    students = db.relationship('Student', secondary='r_intern_question_answer', back_populates='questions', lazy=True)
    companies = db.relationship('Companies', secondary='r_intern_question_answer', back_populates='internships',
                                lazy=True)

    def __repr__(self):
        return f"<InternQuestion: {self.id}, {self.intern_id}>"

    def __init__(self, content, intern_id):
        self.content = content
        self.intern_id = intern_id


class InternAnswer(db.Model):
    __tablename__ = 'r_intern_question_answer'
    student_id = db.Column(db.Integer, db.ForeignKey('t_student_copy1.id'), primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('t_intern_question.id'), primary_key=True)
    answer = db.Column(db.VARCHAR(10000), nullable=False)

    def __repr__(self):
        return f"<InternAnswer: {self.student_id}, {self.question_id}>"


class Process(db.Model):
    __tablename__ = 't_process'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.VARCHAR(255), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    intern_id = db.Column(db.Integer, db.ForeignKey('t_internships.id'))
    applications = db.relationship('InternshipStatus', backref='process', lazy=True)

    def __repr__(self):
        return f"<Process: id :{self.id}, intern id: {self.intern_id}, name: {self.name}>"

    def __init__(self, name, order, intern_id):
        self.name = name
        self.order = order
        self.intern_id = intern_id


"""
class Internship(db.Model):
    __tablename__ = 't_internships'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    company_id = db.Column(db.VARCHAR(255), db.ForeignKey('new_company.id'), nullable=False)
    publisher = db.Column(db.VARCHAR(255))
    type = db.Column(db.VARCHAR(255))
    title = db.Column(db.VARCHAR(255))
    apply_link = db.Column(db.VARCHAR(255))
    description = db.Column(db.TEXT)
    is_remote = db.Column(db.VARCHAR(255))
    posted_time = db.Column(db.VARCHAR(255))
    latitude = db.Column(db.VARCHAR(255))
    longitute = db.Column(db.VARCHAR(255))
    google_link = db.Column(db.VARCHAR(255))
    expiration_datetime_utc = db.Column(db.VARCHAR(255), nullable=True)
    expiration_timestamp = db.Column(db.VARCHAR(255), nullable=True)
    no_experience_required = db.Column(db.VARCHAR(255))
    reuiqred_expersience_in_month = db.Column(db.VARCHAR(255), nullable=True)
    experience_mentioned = db.Column(db.VARCHAR(255))
    experience_preferred = db.Column(db.VARCHAR(255))
    degree_mentioned = db.Column(db.VARCHAR(255))
    degree_preferred = db.Column(db.VARCHAR(255))
    professional_certification_mentioned = db.Column(db.VARCHAR(255))
    job_experience_in_place_of_education = db.Column(db.VARCHAR(255))
    min_salary = db.Column(db.VARCHAR(255))
    max_salary = db.Column(db.VARCHAR(255))
    salary_curreny = db.Column(db.VARCHAR(255))
    salary_period_id = db.Column(db.VARCHAR(255))
    job_id = db.Column(db.VARCHAR(255))
    require_resume = db.Column(db.Boolean)
    require_coverLetter = db.Column(db.Boolean)

    # forign key
    questions = db.relationship("InternQuestion", backref='internship', lazy=True)
    city = db.Column(db.VARCHAR(255), db.ForeignKey('t_cities.id'))
    status = db.relationship('InternshipStatus', back_populates='internship')
    skills = db.relationship('Skill', secondary=job_skills,
                             backref='internship', overlaps="internship")
    processes = db.relationship("Process", backref='internship', lazy=True)

    def __repr__(self):
        return f"<Internship: {self.publisher}, {self.title}, {self.company_id} {self.max_salary}>"

    def get_info(self):
        return {
            "id": self.id,
            "company_id": self.company_id,
            "publisher": self.publisher,
            "type": self.type,
            "title": self.title,
            "apply_link": self.apply_link,
            "description": self.description,
            "is_remote": self.is_remote,
            "posted_time": self.posted_time,
            "latitude": self.latitude,
            "longitute": self.longitute,
            "google_link": self.google_link,
            "expiration_datetime_utc": self.expiration_datetime_utc,
            "expiration_timestamp": self.expiration_timestamp,
            "no_experience_required": self.no_experience_required,
            "reuiqred_expersience_in_month": self.reuiqred_expersience_in_month,
            "experience_mentioned": self.experience_mentioned,
            "experience_preferred": self.experience_preferred,
            "degree_mentioned": self.degree_mentioned,
            "degree_preferred": self.degree_preferred,
            "professional_certification_mentioned": self.professional_certification_mentioned,
            "job_experience_in_place_of_education": self.job_experience_in_place_of_education,
            "min_salary": self.min_salary,
            "max_salary": self.max_salary,
            "salary_curreny": self.salary_curreny,
            "salary_period_id": self.salary_period_id,
            "city": self.city,
            "job_id": self.job_id

        }
"""
