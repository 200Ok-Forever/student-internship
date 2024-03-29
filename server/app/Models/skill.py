from enum import unique
from .. import bcrypt, db

from sqlalchemy.schema import Sequence
class Skill(db.Model):
    __tablename__ = 't_skills'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, unique=True)
    name = db.Column(db.VARCHAR(255))
    internships = db.relationship('Internship', secondary='r_job_skill', back_populates='skills', lazy=True)
    students = db.relationship('Student', secondary='r_student_skill', back_populates='skills', lazy=True)

    # students = db.relationship('Student', secondary='r_student_skill', back_populates='skills', lazy=True)
    def get_info(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def __init__(self, name):
        self.name = name

class JobSkills(db.Model):
    __tablename__ = 'r_job_skill'
    job_id = db.Column('job_id', db.Integer, db.ForeignKey('t_internships.id'), primary_key=True)
    skill_id = db.Column('skill_id', db.Integer, db.ForeignKey('t_skills.id'), primary_key=True)

class StudentSkills(db.Model):
    __tablename__ = 'r_student_skill'
    student_id = db.Column('student_id', db.Integer, db.ForeignKey('t_students.id'), primary_key=True)
    skill_id = db.Column('skill_id', db.Integer, db.ForeignKey('t_skills.id'), primary_key=True)
