# from flask import request, jsonify
# from flask_restx import Resource
# from .forum_model import ForumAPI
# from .forum_utils import ForumUtils
# from flask_jwt_extended import jwt_required

# forum_api = ForumAPI.api


# @forum_api.route("/forum/posts/<int:id>")
# class DeletePost(Resource):
#     def delete(self,id):
#         return ForumUtils.deletepost(id)

#     @forum_api.expect()
#     def patch(self,id):
#         args = request.get_json()
#         return ForumUtils.editPost(id)
