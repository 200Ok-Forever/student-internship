from flask_restx import Api
from flask import Blueprint

from .api_controller import student_api as student
from .api_controller import company_api as company
from .api_controller import internship_api as internship

# Import controller APIs as namespaces.
api_bp = Blueprint("api", __name__)

api = Api(api_bp, title="API", description="InternHub Main routes.")

# API namespaces
api.add_namespace(student)
api.add_namespace(company)
api.add_namespace(internship)
