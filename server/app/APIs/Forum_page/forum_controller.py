from flask import request, jsonify
from flask_restx import Resource
from .forum_model import ForumAPI
from .forum_utils import ForumUtils
from flask_jwt_extended import jwt_required
from ... import db
from  ...Models import model 
from  ...Models import forum

forum_api = ForumAPI.forum_ns


@forum_api.route("/posts")
class GePosts(Resource):
    @forum_api.response(200, "Successfully")
    @forum_api.response(400, "Something wrong")
    # @jwt_required()
    def post(self):
        return "Hi"

@forum_api.route("/posts/<id>")
class GePost(Resource):
    def get(self, id):
        post = db.session.query(forum.Post).filter(forum.Post.id == id).first()
        if post == None:
            return {"message": "Invalid post id"}, 400