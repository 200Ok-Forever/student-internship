"""Restful API model"""

from flask_restx import Namespace, fields


class StudentAPI:
    api = Namespace("Student info", description="Student related operations.")

    student_info = api.model('Student', {
        'id': fields.String,
        'name': fields.String,
    })


class CompanyAPI:
    api = Namespace("Company", description="Company related operations.")

    company_info = api.model('Company info', {
        'id': fields.String,
        'name': fields.String,
        'jobs': fields.List(fields.String)
    })


class InternshipAPI:
    api = Namespace("Internship", description="Internship related operations.")

    company_info = api.model('Internship info', {
        'id': fields.String,
        'name': fields.String,
    })
