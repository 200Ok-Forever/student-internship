from datetime import date, timedelta
from xml.etree.ElementTree import Comment
from flask import request, jsonify
from flask_restx import Resource
from .forum_model import ForumAPI
from .forum_utils import ForumUtils
from flask_jwt_extended import jwt_required
from flask_restx import Resource, reqparse
from ... import db
from  ...Models.forum import Post, PostComment, Fourm
from sqlalchemy import and_, null, or_
from sqlalchemy import func
from ...Helpers.other_util import convert_object_to_dict, convert_model_to_dict

forum_api = ForumAPI.forum_ns


@forum_api.route("/<id>/posts")
class GetAllPosts(Resource):
    @forum_api.response(200, "Successfully")
    @forum_api.response(400, "Something wrong")
    def get(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('pageNumber', type=int, location='args', default=1)
        parser.add_argument('userId', type=int, location='args')
        parser.add_argument('searchTerm', type=str, location='args')
        parser.add_argument('strategy', choices=['newest', 'hottest', 'popular'], type=str, location='args')
        args = parser.parse_args()


        query = db.session.query(Fourm, Post, func.count(PostComment.id)).outerjoin(PostComment, PostComment.post_id == Post.id).filter(Fourm.id == id, Post.forum_id == Fourm.id).group_by(PostComment.post_id)
        # need to get the users posts
        if args['userId'] != None:
            query = query.filter(Post.student_id == int(args['userId']))
        
        if args['searchTerm'] != None:
            key = args['searchTerm']
            query = query.filter(Post.content.ilike(f'%{key}%'), or_(Post.title.ilike(f'%{key}%')))
        
        if args['strategy'] != None and args['strategy'] =='newest':
            query = query.order(Post.created_time.desc())
        elif args['strategy'] != None and args['strategy'] =='hottest':
            yesterday = date.today() - timedelta(days = 1)
            query = query.filter(Post.created_time == yesterday).order(func.count(PostComment.id).desc())
        elif args['strategy'] != None and args['strategy'] =='popular':
            query = query.order(func.count(PostComment.id).desc())
        
        # 10 items per page
        index = args['pageNumber'] - 1 
        posts = query.offset(index * 10).limit(10).all()
        print(posts)



@forum_api.route("/posts/<id>")
class GetPost(Resource):
    @forum_api.response(200, "Successfully")
    @forum_api.response(400, "Something wrong")
    def get(self, id):
        post = db.session.query(Post).outerjoin(PostComment, PostComment.post_id == Post.id).filter(Post.id == id).first()
        if post == None:
            return 400
        
        result = {}
        result['post'] = convert_object_to_dict(post)

        comments = post.comments
        result['comments'] = convert_model_to_dict(comments)

        return result, 200
        

@forum_api.route("/forum/posts/<int:id>")
class DeletePost(Resource):
    def delete(self,id):
        return ForumUtils.deletepost(id)

    @forum_api.expect()
    def patch(self,id):
        args = request.get_json()
        return ForumUtils.editPost(id,args)