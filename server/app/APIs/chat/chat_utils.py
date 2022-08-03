from plistlib import UID
from sys import intern
from flask import jsonify
import requests
import re
from json import dumps
from requests import session
from sqlalchemy import null
from torch import is_same_size
from ...Models.model import Calendar, StudentSkills,Internship, City, Company, Comment, User, Skill,InternshipStatus,Student, File
from flask_restx import Resource, reqparse
from ...extension import db
from string import digits
import datetime
from sqlalchemy.sql.functions import coalesce
from sqlalchemy import nullslast
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity

class ChatUtils:
    def getUser():
        user = db.session.query(User).all()
        results = []
        for u in user:
            result = {
                "userid": u.uid,
                "name": u.name,
                "avatar": u.avatar
            }
            results.append(result)
        return jsonify(results),200
        pass