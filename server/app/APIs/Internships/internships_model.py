from flask_restx import Namespace, fields


class QandA(fields.Raw):
  def format(self, value):
    return {  
      
        'question_id': fields.Integer,
        'answer':fields.String
      }
class InternshipsAPI:
    api = Namespace("Internship", description="Internship related operations.")

    internship_get = api.model('Internship info', {
        'id': fields.Integer,

    })

    search_internships = api.model('Search Interships Info', {
        'job': fields.String,
        'location': fields.String,
        'sort': fields.String,
        'paid': fields.String,
        'is_remote': fields.String,
        'job_type': fields.String,
        'current_page': fields.Integer
    })

    internship_comment = api.model(
        "update internship comment", {
            "comment": fields.String(required=True),
            "parent_id": fields.Integer(required=True)
        }
    )

    internship_apply = api.model(
        "apply internship", {
            # "internship_id": fields.Integer(required=True),
            "resume": fields.String,
            "coverletter":fields.String,
            "interview_question": fields.List(QandA()), 
        }
    )

    internship_calendar = api.model(
        "calendar",{
            "name": fields.String,
            "type":fields.String,
            "start": fields.DateTime,
            "end": fields.DateTime,
            "internshipId": fields.String,

        }
    )


