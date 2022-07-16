from flask_restx import Namespace, fields


company_info = {
    "name": fields.String(required=True),
    "logo": fields.String(required=True),
    "website": fields.String(required=True)
}

class CompanyPageAPI:
    company_ns = Namespace("company", description="Company related operations.")

    company_data = company_ns.model('Company info', company_info)

