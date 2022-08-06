"""ORM and Schema"""

from sqlalchemy.ext.hybrid import hybrid_method
from torch import autocast_increment_nesting
from wtforms import Form, IntegerField, StringField, PasswordField, validators
from .. import bcrypt, db


class User(db.Model):
    """User(student&company) table"""
    __tablename__ = 't_user'
    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.VARCHAR(60), nullable=False, unique=True)
    email = db.Column(db.VARCHAR(320), nullable=False, unique=True)
    hashed_password = db.Column(db.BINARY(60), nullable=False)
    role = db.Column(db.Integer, nullable=False)
    avatar = db.Column(db.TEXT, nullable=True)
    verification_code = db.Column(db.VARCHAR(6))

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
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'avatar': self.avatar,
            'verification_code': self.verification_code
        }


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
    position = db.Column(db.VARCHAR(50))
    skills = db.Column(db.VARCHAR(100))
    description = db.Column(db.VARCHAR(200))

    # students_skills = db.relationship('Skill', secondary='r_student_skill', back_populates='students', lazy=True)
    questions =  db.relationship('InternQuestion', secondary='r_intern_question_answer', back_populates='students', lazy=True)
    applications = db.relationship('InternshipStatus', backref='student')

    def __repr__(self):
        return f"<Student: {self.email}, {self.first_name} {self.last_name}>"

    def get_info(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "university": self.university,
            "degree": self.degree,
            "major": self.major,
            "position": self.position,
            "skills": self.skills,
            "description": self.description
        }

class Company(db.Model):
    __tablename__ = 't_company'
    id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    email = db.Column(db.VARCHAR(320), nullable=False, unique=True)
    company_name = db.Column(db.VARCHAR(255), nullable=False, unique=True)
    first_name = db.Column(db.VARCHAR(255), nullable=False)
    last_name = db.Column(db.VARCHAR(255), nullable=False)
    industry = db.Column(db.VARCHAR(255))
    linkedin = db.Column(db.VARCHAR(255))
    founded_year = db.Column(db.VARCHAR(4), nullable=False)
    company_url = db.Column(db.VARCHAR(255))
    company_size = db.Column(db.VARCHAR(10), nullable=False)
    location = db.Column(db.VARCHAR(255))
    description = db.Column(db.VARCHAR(200))
    company_logo = db.Column(db.TEXT)

    def __repr__(self):
        return f"<Recruiter: {self.email}, {self.first_name} {self.last_name}>"

    def get_info(self):
        return {
            "id": self.uid,
            "email": self.email,
            "company_name": self.company_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "industry": self.industry,
            "linkedin": self.linkedin,
            "founded_year": self.founded_year,

            "company_size": self.company_size,
            "location": self.location,
            "description": self.description,
            "company_logo": self.company_logo
        }





class StudentSkills(db.Model):
    __tablename__ = 'r_student_skill'
    student_id = db.Column('student_id', db.Integer, db.ForeignKey('t_student.id'), primary_key=True)
    skill_id = db.Column('skill_id', db.Integer, db.ForeignKey('t_skills.id'), primary_key=True)



    # more


class Calendar(db.Model):
    __tablename__ = 't_calendar'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    internship_id = db.Column(db.Integer,db.ForeignKey("t_internships.id"))
    uid = db.Column(db.Integer,db.ForeignKey("t_user.uid"))
    start = db.Column(db.DATETIME)
    title = db.Column(db.VARCHAR(255))
    type = db.Column(db.VARCHAR(255))
    link = db.Column(db.VARCHAR(255))
    is_calendar = db.Column(db.Boolean)


class Comment(db.Model):
    __tablename__ = 't_comment'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    internship_id = db.Column(db.Integer, db.ForeignKey("t_internships.id"))
    content = db.Column(db.TEXT)
    parent_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("t_user.uid"))
    date = db.Column(db.TIMESTAMP)

    def get_info(self):
        return {
            "id": self.id,
            "internship_id": self.internship_id,
            "content": self.content,
            "parent_id": self.parent_id,
            "user_id": self.user_id,
            "date": self.date
        }


class File(db.Model):
    __tablename__ = 't_uploadfile'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.VARCHAR(255))
    uid = db.Column(db.Integer, db.ForeignKey('t_user.uid'))
    data = db.Column(db.LargeBinary(length=(2 ** 32) - 1))
    file_type = db.Column(db.VARCHAR(255))
    upload_time = db.Column(db.TIMESTAMP)




# class Forum(db.Model):
#     __tablename__ = 't_forum'


class LoginSchema(Form):
    email = StringField('Email Address', [validators.Length(min=6, max=35)])
    password = PasswordField('Password', [validators.Length(min=6, max=16), validators.DataRequired()])


class SignUpSchema(Form):
    email = StringField('Email Address', [validators.DataRequired(), validators.Length(min=6, max=320)])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')])
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


class InternshipSearchSchema(Form):
    job = StringField('job', [validators.optional(), validators.Length(max=200)])
    location = StringField('location', [validators.optional(), validators.Length(max=200)])
    sort = StringField('sort', [validators.optional(), validators.Length(max=200)])
    paid = StringField('paid', [validators.optional(), validators.Length(max=200)])
    remote = StringField('remote', [validators.optional(), validators.Length(max=200)])
    job_type = StringField('job_type', [validators.optional(), validators.Length(max=200)])
    current_page = IntegerField('current_page', [validators.optional(), validators.Length(max=200)])
