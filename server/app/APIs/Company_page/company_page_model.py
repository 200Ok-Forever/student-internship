from flask_restx import Namespace, fields


class CompanyPageAPI:
    api = Namespace("company", description="Company related operations.")

    company_info = api.model('Company info', {
        'id': fields.String,
    })