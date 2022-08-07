# # from server.app.APIs.Forum.forum_controller import DeletePost


# from plistlib import UID
# from sys import intern
# from flask import jsonify
# import requests
# import re
# from json import dumps
# from requests import session
# from sqlalchemy import null
# from torch import is_same_size
# from ...Models.model import Post, Calendar, StudentSkills,Internship, City, Company, Comment, User, Skill,InternshipStatus,Student, File
# from flask_restx import Resource, reqparse
# from ...extension import db
# from string import digits
# import datetime
# from sqlalchemy.sql.functions import coalesce
# from sqlalchemy import nullslast
# from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity

# class ForumUtils:
#     def deletepost(id):
#         # obj = Post.query.filter_by(Post.id=id).one()
#         try:

#             db.delete(obj)
#             db.session.commit()
#             return dumps({'message': 'delete sucessfully'}), 200
#         except Exception as error:

#             return dumps({'msg': error}), 400
#         pass
#     def editPost(id,arg):

#         # Post.query.filter(Post.id = id).update(Post.content:arg['content'])
#         pass

def get_comments(comments, all_comms):
    if comments == None or len(comments) == 0:
        return []
    result = []
    for comm in comments:
        next_level = [com for com in all_comms if com.parent_id == comm.id]
        data = {"text": comm.content, 
        "uid": comm.student_id,
        "authName": comm.student.user.username,
        "authId": comm.student.id,
        "avatar": comm.student.user.avatar,
        "time": comm.created_time, 
        "content": comm.content,
        "replied": get_comments(next_level, all_comms)} 
        result.append(data)
    result.sort(key=lambda x: x['time']) 
    return result
class ForumUtils:
    pass

