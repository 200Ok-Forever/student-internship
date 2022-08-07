from sqlalchemy.ext.hybrid import hybrid_method
from torch import autocast_increment_nesting
from wtforms import Form, IntegerField, StringField, PasswordField, validators
from .. import bcrypt, db


class Companies(db.Model):
    __tablename__ = "t_companies"
    id = db.Column(db.Integer, db.ForeignKey('t_user.uid'), primary_key=True, autoincrement=True, nullable=False,
                   unique=True)
    email = db.Column(db.VARCHAR(320), nullable=False, unique=True)
    company_name = db.Column(db.VARCHAR(255), nullable=False, unique=True)
    first_name = db.Column(db.VARCHAR(255), nullable=False, unique=True)
    last_name = db.Column(db.VARCHAR(255), nullable=False, unique=True)
    linkedin = db.Column(db.VARCHAR(255))
    founded_year = db.Column(db.VARCHAR(255))
    company_url = db.Column(db.VARCHAR(255))
    company_size = db.Column(db.VARCHAR(255))
    country = db.Column(db.VARCHAR(255))
    city = db.Column(db.VARCHAR(255))
    line1 = db.Column(db.VARCHAR(255))
    postalCode = db.Column(db.VARCHAR(255))
    description = db.Column(db.VARCHAR(10000))
    company_logo = db.Column(db.TEXT)
    industries = db.relationship('Industry', secondary='r_industry_company', back_populates='companies', lazy=True)
    internships = db.relationship('Internship', backref='company', lazy=True)

    def __repr__(self):
        return '<Company id:{} name:>'.format(self.id, self.company_name)

    def get_info(self):
        industries = [industry.name for industry in self.industries]
        return {
            "id": self.id,
            "email": self.email,
            "company_name": self.company_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "linkedin": self.linkedin,
            "company_size": self.company_size,
            "country": self.country,
            "city": self.city,
            "line1": self.line1,
            "postalCode": self.postalCode,
            "logo": self.company_logo,
            "industries": industries,
            "founded_year": self.founded_year,
            "company_url": self.company_url,
            "description": self.description,
        }


class Industry(db.Model):
    __tablename__ = 't_industry'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False, unique=True)
    name = db.Column(db.VARCHAR(255), nullable=False, unique=True)
    companies = db.relationship('Companies', secondary='r_industry_company', back_populates='industries', lazy=True)

    def __repr__(self):
        return '<Industry id:{} name:>'.format(self.id, self.name)

    def __init__(self, name):
        self.name = name

    def get_info(self):
        return {
            "id": self.id,
            "name": self.name
        }


class CompanyIndustry(db.Model):
    __tablename__ = 'r_industry_company'
    company_id = db.Column(db.Integer, db.ForeignKey('t_companies.id'), nullable=False, primary_key=True)
    industry_id = db.Column(db.Integer, db.ForeignKey('t_industry.id'), nullable=False, primary_key=True)

    def __repr__(self):
        return '<CompanyIndustry compnay id:{} industry id:>'.format(self.company_id, self.industry_id)

    def __init__(self, company, industry):
        self.company_id = company
        self.industry_id = industry
