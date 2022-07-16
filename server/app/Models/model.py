"""ORM and Schema"""

from importlib.resources import Resource
import re
from sys import intern
from numpy import cov, require
from sqlalchemy.ext.hybrid import hybrid_method
from wtforms import Form, IntegerField, StringField, PasswordField, validators
from .. import bcrypt, db
from sqlalchemy.dialects.mysql import TINYINT

from sqlalchemy.schema import Sequence
class User(db.Model):
    """User(student&company) table"""
    __tablename__ = 't_user'
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.VARCHAR(320), nullable=False, unique=True)
    hashed_password = db.Column(db.BINARY(60), nullable=False)
    role = db.Column(db.Integer, nullable=False)
    company = db.relationship('Company', backref='user', lazy=True)

    @property
    def password(self):
        raise AttributeError("Password is not a readable attribute")

    @password.setter
    def password(self, password):
        self.hashed_password = bcrypt.generate_password_hash(password)

    @hybrid_method
    def verify_password(self, password):
        return bcrypt.check_password_hash(self.hashed_password, password)

    def get_info(self):
        return {
            'uid': self.uid,
            'email': self.email,
            'role': self.role
        }

class Internship(db.Model):
    """Internship table"""
    __tablename__ = 't_internships'

    job_id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    publisher = db.Column('publisher', db.String(256), nullable=False)
    job_type = db.Column('type', db.String(256), nullable=False)
    title = db.Column('title', db.String(256), nullable=False)
    apply_link = db.Column('apply_link', db.String(256), nullable=False)
    description = db.Column('description', db.String(256), nullable=False)
    is_remote = db.Column('is_remote', db.String(256), nullable=False)
    posted_time = db.Column('posted_time',db.String(256), nullable=False)
    latitude = db.Column('latitude',db.String(256), nullable=False)
    location = db.Column('location',db.String(256))
    longitute = db.Column('longitute',db.String(256), nullable=False)
    google_link = db.Column('google_link',db.String(256))
    company_id = db.Column('company_id', db.Integer, db.ForeignKey('t_company.id'), nullable=False)
    closed_time = db.Column('expiration_datetime_utc', db.String(255))
    min_salary = db.Column('min_salary', db.Integer)
    max_salary = db.Column('max_salary', db.Integer)
    salary_curreny = db.Column('salary_curreny', db.String(256))
    students_of_appilcation = db.relationship('Student', secondary='t_intern_user_status', back_populates='internships', lazy=True)
    questions = db.relationship('Question', backref='internship', lazy=True)
    require_resume = db.Column('require_resume', TINYINT(), nullable=False)
    require_coverLetter = db.Column('require_coverLetter', TINYINT(), nullable=False)
    processes = db.relationship('Process', backref='internship', lazy=True)
    def __repr__(self):
        return f"<Intership: id: {self.id}, company: {self.company_id}>"


    def __init__(self, title, closed_time, location, currency, min, max, is_remote, type, description):
        self.title = title
        self.closed_time = closed_time
        self.location = location
        self.salary_curreny = currency
        self.min_salary = min
        self.max_salary = max
        self.is_remote = is_remote
        self.job_type = type
        self.description = description
    """

    def __init__(self, data):
        self.publisher = data['publisher']
        self.type = data['type']
        self.title = data['title']
        self.apply_link = data['apply_link']
        self.description = data['description']
        self.is_remote = data['is_remote']
        self.posted_time = data['posted_time']
        self.latitude = data['latitude']
        self.longitute = data['longitute']
        self.google_link = data['google_link']
        self.company_id = data['company_id']
        self.require_resume = data['require_resume']
        self.require_coverLetter = data['require_coverLetter']
    """


class Application(db.Model):
    __tablename__ = 't_intern_user_status'
    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    student_id = db.Column('uid', db.Integer, db.ForeignKey('t_student.id'), nullable=False)
    intership_id = db.Column('intern_id', db.Integer, db.ForeignKey('t_internships.id'), nullable=False)
    is_seen = db.Column('is_seen', db.String(255))
    is_save= db.Column('is_save', db.String(255))
    is_applied = db.Column('is_applied', db.String(255))
    status = db.Column('status', db.String(255))

    def __repr__(self):
        return f"<Application: id: {self.id}, student_id: {self.student_id} internship_id: {self.intership_id}>"

    def __init__(self, student_id, internship_id, status, apply_time):
        self.student_id = student_id
        self.intership_id = internship_id
        self.status = status
        self.apply_time = apply_time
        
class Student(db.Model):
    """Student table"""
    __tablename__ = 't_student'
    id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    email = db.Column(db.VARCHAR(320), nullable=False, unique=True)
    first_name = db.Column(db.VARCHAR(50), nullable=False)
    last_name = db.Column(db.VARCHAR(50), nullable=False)
    university = db.Column(db.VARCHAR(100), nullable=False)
    degree = db.Column(db.VARCHAR(15), nullable=False)
    major = db.Column(db.VARCHAR(15))
    skills = db.Column(db.VARCHAR(100))
    description = db.Column(db.VARCHAR(200))
    internships = db.relationship('Internship', secondary='t_intern_user_status', back_populates='students_of_appilcation', lazy=True)
    questions = db.relationship('Question', secondary='r_intern_question_answer', back_populates='students', lazy=True)

    def __repr__(self):
        return f"<Student: {self.username}, {self.email}, {self.first_name} {self.last_name}>"

    def get_info(self):
        return {
            "id": self.uid,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "university": self.university,
            "degree": self.degree,
            "major": self.major,
            "skills": self.skills,
            "description": self.description
        }






class LoginSchema(Form):
    email = StringField('Email Address', [validators.Length(min=6, max=35)])
    password = PasswordField('Password', [validators.Length(min=6, max=16), validators.DataRequired()])


class SignUpSchema(Form):
    email = StringField('Email Address', [validators.DataRequired(), validators.Length(min=6, max=320)])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')])
    confirm = PasswordField('Repeat Password', [validators.DataRequired()])
    first_name = StringField('Username', [validators.DataRequired(), validators.Length(min=1, max=50)])
    last_name = StringField('Username', [validators.DataRequired(), validators.Length(min=1, max=50)])
    description = StringField('Description', [validators.Length(max=200)])


class StudentSignUpSchema(SignUpSchema):
    username = StringField('Username', [validators.DataRequired(), validators.Length(max=50)])
    university = StringField('University', [validators.DataRequired(), validators.Length(max=100)])
    degree = StringField('Degree', [validators.Length(max=15)])
    major = StringField('Major', [validators.DataRequired(), validators.Length(max=15)])
    skill = StringField('Skill', [validators.Length(max=100)])


class CompanySignUpSchema(SignUpSchema):
    company_name = StringField('Company name', [validators.DataRequired(), validators.Length(min=4, max=60)])
    industry = StringField('Industry', [validators.Length(max=20)])
    linkedin = StringField('Linkedin', [validators.Length(max=100)])
    company_url = StringField('Company url', [validators.Length(max=100)])
    founded_year = StringField('Founded year', [validators.DataRequired(), validators.Length(4)])
    company_size = IntegerField('Company size', [validators.DataRequired(), validators.Length(4)])
    location = StringField('Location', [validators.Length(max=100)])

class Company(db.Model):
    """Company table"""
    __tablename__ = 't_company'
    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    email = db.Column('email', db.String(320), nullable=False)
    name = db.Column('company_name', db.String(255), nullable=False)
    first_name = db.Column('first_name', db.String(255))
    last_name = db.Column('last_name', db.String(255))
    industry = db.Column('industry', db.String(255))
    linkedin = db.Column('linkedin', db.String(255))
    founded_year = db.Column('founded_year', db.String(4))
    company_size = db.Column('company_size', db.String(10))
    logo = db.Column('logo', db.String(255))
    location = db.Column('location', db.String(255))
    description = db.Column('description', db.String(255))
    company_url = db.Column('company_url', db.String(256))
    jobs = db.relationship('Internship', backref='company', lazy=True)
    user_id = db.Column('user_id', db.Integer,  db.ForeignKey('t_user.uid'))

    def __repr__(self):
        return f"<Company: id: {self.id}, name{self.name}>"

    def __init__(self, id, name, logo, website):
        self.id = id
        self.name = name
        self.logo = logo
        self.website = website


class Question(db.Model):
    __tablename__ = "t_intern_question"

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    inetrn_id = db.Column('intern_id', db.Integer, db.ForeignKey('t_internships.id'),nullable=False)
    content= db.Column('content', db.String(10000), nullable=False)
    students = db.relationship('Student', secondary='r_intern_question_answer', back_populates='questions', lazy=True)
    def __repr__(self):
        return f"<Question: id: {self.id}, intern id{self.inetrn_id}>"

    def __init__(self, intern_id, content):
        self.inetrn_id = intern_id
        self.content = content

class Answer(db.Model):
    __tablename__ = "r_intern_question_answer"
    student_id = db.Column('student_id', db.Integer, db.ForeignKey('t_student.id'),nullable=False, primary_key=True)
    question_id = db.Column('question_id', db.Integer, db.ForeignKey('t_intern_question.id'), nullable=False, primary_key=True)
    answer = db.Column('answer', db.String(10000), nullable=False)

    def __repr__(self):
        return f"<Answer: student id: {self.student_id}, question id{self.question_id}>"

    def __init__(self, student_id, question_id, answer):
        self.student_id = student_id
        self.question_id = question_id
        self.answer = answer

class Process(db.Model):
    __tablename__ = 't_process'
    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    intern_id = db.Column('intern_id', db.Integer, db.ForeignKey('t_internships.id'),nullable=False)
    order = db.Column('order', db.Integer, nullable=False)
    name = db.Column('name', db.String(255), nullable=False)

    def __repr__(self):
        return f"<Process: id: {self.id}"

    def __init__(self, intern_id, order, name):
        self.intern_id = intern_id
        self.order = order
        self.name = name