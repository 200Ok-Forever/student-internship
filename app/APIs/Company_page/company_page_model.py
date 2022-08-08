from flask_restx import Namespace, fields

company_info = {
    #"email": fields.String(required=True),
    "company_name": fields.String(required=True),
    "first_name": fields.String(required=True),
    "last_name": fields.String(required=True),
    "linkedin": fields.String(required=True),
    "founded_year": fields.String(required=True),
    "company_url": fields.String(required=True),
    "company_size": fields.String(required=True),
    "country": fields.String(required=True),
    "city": fields.String(required=True),
    "line1": fields.String(required=True),
    "description": fields.String(required=True),
    "company_logo": fields.String(required=True),
    "industry": fields.List(fields.String, required=True)
}


class Form(fields.Raw):
  def format(self, value):
    return {  
    "resume": fields.Boolean(required=True), 
    "coverLetter": fields.Boolean(required=True), 
    "questions": fields.List(fields.String, required=True)
    }
      

intern_info = {
    "type": fields.String(required=True),
    "title": fields.String(required=True),
    "apply_link": fields.String(required=True),
    "is_remote": fields.String(required=True),
    "description": fields.String(required=True),
    "google_link": fields.String(required=True),
    "expiration_time": fields.String(required=True),
    "min_salary": fields.Integer(required=True),
    "max_salary": fields.Integer(required=True),
    "salary_currency": fields.String(required=True),
    "recruiting_process": fields.List(fields.String(), required=True),
    "skills": fields.List(fields.String, required=True),
    "application": Form(required=True),
    "city": fields.String(required=True)
}


class CompanyPageAPI:
    company_ns = Namespace("company", description="Company related operations.")

    company_data = company_ns.model('Company info', company_info)
    intern_data = company_ns.model('Intern info', intern_info)