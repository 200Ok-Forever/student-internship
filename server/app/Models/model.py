"""ORM and Schema"""

from sqlalchemy.ext.hybrid import hybrid_method
from wtforms import Form, IntegerField, StringField, PasswordField, validators
from .. import bcrypt, db


class User(db.Model):
    """User(student&company) table"""
    __tablename__ = 't_user'
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.VARCHAR(320), nullable=False, unique=True)
    hashed_password = db.Column(db.BINARY(60), nullable=False)
    role = db.Column(db.Integer, nullable=False)

    @property
    def password(self):
        raise AttributeError("Password is not a readable attribute")

    @password.setter
    def password(self, password):
        self.hashed_password = bcrypt.generate_password_hash(password)

    @hybrid_method
    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def get_info(self):
        return {
            'uid': self.uid,
            'email': self.email,
            'role': self.role
        }


class Student(db.Model):
    """Student table"""
    __tablename__ = 't_student'
    id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    username = db.Column(db.VARCHAR(50), nullable=False, unique=True)
    email = db.Column(db.VARCHAR(320), nullable=False, unique=True)
    first_name = db.Column(db.VARCHAR(50), nullable=False)
    last_name = db.Column(db.VARCHAR(50), nullable=False)
    university = db.Column(db.VARCHAR(100), nullable=False)
    degree = db.Column(db.VARCHAR(15), nullable=False)
    major = db.Column(db.VARCHAR(15))
    skills = db.Column(db.VARCHAR(100))
    description = db.Column(db.VARCHAR(200))

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


class Company(db.Model):
    """Company table"""
    __tablename__ = 't_company'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    # more


class Internship(db.Model):
    """Internship table"""
    __tablename__ = 'internship'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    # more


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
