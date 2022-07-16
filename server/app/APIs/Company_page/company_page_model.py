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

class CompanyPageAPI:
    company_ns = Namespace("company", description="Company related operations.")

    company_data = company_ns.model('Company info', company_info)

