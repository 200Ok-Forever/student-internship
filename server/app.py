from flask import Flask, request, send_file
from flask_restx import Resource, Api, reqparse, fields
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import json
import re
import requests
import datetime

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///200_ok_forever.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['ERROR_404_HELP'] = False
app.config.update({
    'SQLALCHEMY_POOL_SIZE': None,
    'SQLALCHEMY_POOL_TIMEOUT': None
})
db = SQLAlchemy(app)

add_internship_parser = reqparse.RequestParser()
add_internship_parser.add_argument('name', required=True, type=str, help='Internship Name')
retrieve_internship_parser = reqparse.RequestParser()
retrieve_internship_parser.add_argument('name', required=True, type=str, help='Internship Name')

internship_model = api.model('Internships', {
    'name': fields.String,
    'company': fields.String,
    'address': fields.String,
    'requirement': fields.String,
})


class InternshipDB(db.Model):
    __tablename__ = 'Internships'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    company = db.Column(db.String(50))
    address = db.Column(db.String(20))
    requirement = db.Column(db.String(20))
    last_update = db.Column(db.String(20))

    def __repr__(self):
        return f"<ActorDB(id='{self.id}', name='{self.name}, company={self.company}, address={self.address}," \
               f"requirement={self.requirement}, last_update={self.last_update}')>"


@app.before_first_request
def create_db():
    db.create_engine('sqlite:////200_ok_forever.db', {})
    db.create_all()
    db.session.commit()


@api.route('/internships')
@api.response(200, 'Success')
@api.response(201, 'Success')
@api.response(404, 'Not found')
@api.response(403, 'Unauthorized operation')
class Internships(Resource):

    @api.expect(retrieve_internship_parser)
    def get(self):
        response = {"Internships": ["internship1", "internship2", "internship3"]}
        return response, 201


if __name__ == '__main__':
    app.run(debug=True)
