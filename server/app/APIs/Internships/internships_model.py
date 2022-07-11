from flask_restx import Namespace, fields


class InternshipsAPI:
    api = Namespace("Internship", description="Internship related operations.")

    company_info = api.model('Internship info', {
        'id': fields.String,
    })
