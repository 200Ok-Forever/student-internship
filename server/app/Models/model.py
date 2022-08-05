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
    status = db.relationship('InternshipStatus', back_populates='user')

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


    # student_skills = db.relationship('Skill', secondary='r_student_skill', back_populates='students', lazy=True)
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
    """Company table"""
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


job_skills = db.Table('r_job_skill',
                      db.Column('job_id', db.Integer, db.ForeignKey('t_internships.id'), primary_key=True),
                      db.Column('skill_id', db.Integer, db.ForeignKey('t_skills.id'), primary_key=True))




class StudentSkills(db.Model):
    __tablename__ = 'r_student_skill'
    student_id = db.Column('student_id', db.Integer, db.ForeignKey('t_student.id'), primary_key=True)
    skill_id = db.Column('skill_id', db.Integer, db.ForeignKey('t_skills.id'), primary_key=True)

class Internship(db.Model):
    """Internship table"""
    __tablename__ = 't_internships'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    company_id = db.Column(db.VARCHAR(255), nullable=False)
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

    city = db.Column(db.VARCHAR(255), db.ForeignKey('t_cities.id'))
    job_id = db.Column(db.VARCHAR(255))
    # citys = db.relationship('City', backref = 'internship', lazy = 'dynamic')

    status = db.relationship('InternshipStatus', back_populates='internship')

    # skills = db.relationship('Skill', secondary=job_skills,
                            #  backref='internship', overlaps="internship")

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
    # more


class Calendar(db.Model):
    __tablename__= 't_calendar'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    internship_id = db.Column(db.Integer,db.ForeignKey("t_internships.id"))
    uid = db.Column(db.Integer,db.ForeignKey("t_user.id"))
    start = db.Column(db.DATETIME)
    end = db.Column(db.DATETIME)
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


class Skill(db.Model):
    __tablename__ = 't_skills'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR(255))
    internships = db.relationship('Internship', secondary=job_skills, backref='skill', overlaps="skills")
    # students = db.relationship('Student', secondary='r_student_skill', back_populates='skills', lazy=True)
    def get_info(self):
        return {
            "id": self.id,
            "name": self.name
        }


class City(db.Model):
    __tablename__ = 't_cities'
    id = db.Column(db.Integer, primary_key=True)
    state_id = db.Column(db.Integer)
    name = db.Column(db.VARCHAR(255))
    internships = db.relationship("Internship", backref='citys', lazy='dynamic')


class InternshipStatus(db.Model):
    __tablename__ = 't_intern_user_status'
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey('t_user.uid'))

    intern_id = db.Column(db.Integer, db.ForeignKey('t_internships.id'))
    is_seen = db.Column(db.VARCHAR(255))
    is_save = db.Column(db.VARCHAR(255))
    is_applied = db.Column(db.VARCHAR(255))
    seen_time = db.Column(db.TIMESTAMP)
    internship = db.relationship('Internship', back_populates='status')
    user = db.relationship('User', back_populates='status')

class File(db.Model):
    __tablename__ = 't_uploadfile'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.VARCHAR(255))
    uid = db.Column(db.Integer, db.ForeignKey('t_user.uid'))
    data = db.Column(db.LargeBinary(length=(2**32)-1))
    file_type = db.Column(db.VARCHAR(255))
    upload_time = db.Column(db.TIMESTAMP)

class StudentInterveiwQuestion(db.Model):
    __tablename__ = 'r_intern_question_answer'
    student_id = db.Column(db.Integer, db.ForeignKey('t_student.id'), primary_key = True)
    question_id = db.Column(db.Integer, db.ForeignKey('t_intern_question.id'), primary_key = True)
    answer = db.Column(db.VARCHAR(1000))

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
