from flask_restx import Namespace, fields

company_info = {
    "email": fields.String(required=True),
    "first_name": fields.String(required=True),
    "last_name": fields.String(required=True),
    "company_name": fields.String(required=True),
    "industry": fields.String(required=True),
    "linkedin": fields.String(required=True),
    "company_url": fields.String(required=True),
    "founded_year": fields.String(required=True),
    "company_size": fields.String(required=True),
    "location": fields.String(required=True),
    "description": fields.String(required=True)
}


class Form(fields.Raw):
  def format(self, value):
    return {  
    "resume": fields.Boolean(required=True), 
    "coverLetter": fields.Boolean(required=True), 
    "questions": fields.List(fields.String, required=True)
    }
      

intern_info = {
    "job_title": fields.String(required=True),
    "closed_date": fields.String(required=True),
    "location": fields.String(required=True),
    "salary_currency": fields.String(required=True),
    "min_salary": fields.Integer(required=True),
    "max_salary": fields.Integer(required=True),
    "is_remote": fields.String(required=True),
    "job_type": fields.String(required=True),
    "recruiting_process": fields.List(fields.String(), required=True),
    "description": fields.String(required=True),
    "application": Form(required=True),
}


class CompanyPageAPI:
    company_ns = Namespace("company", description="Company related operations.")

    company_data = company_ns.model('Company info', company_info)
    intern_data = company_ns.model('Intern info', intern_info)