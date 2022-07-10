from flask_restx import Namespace, fields


class InternshipsAPI:
    api = Namespace("Internship", description="Internship related operations.")

    internship_get = api.model('Internship info', {
        'id': fields.Integer,
        
    })

    search_internships = api.model('Search Interships Info', {
        'job':fields.String,
        'location':fields.String,
        'sort':fields.String,
        'paid':fields.String,
        'remote': fields.String,
        'job_type': fields.String,
        'current_page': fields.Integer
    })
