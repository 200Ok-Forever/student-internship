from datetime import date, timedelta
from xml.etree.ElementTree import Comment
from flask import request, jsonify
from flask_restx import Resource
from .forum_model import ForumAPI
from .forum_utils import ForumUtils
from flask_jwt_extended import jwt_required
from flask_restx import Resource, reqparse
from ... import db
from ...Models.forum import Post, PostComment, Forum
from sqlalchemy import and_, null, or_
from sqlalchemy import func
from ...Helpers.other_util import convert_object_to_dict, convert_model_to_dict

forum_api = ForumAPI.forum_ns

forum_parser = reqparse.RequestParser()
forum_parser.add_argument('pageNumber', type=int, location='args', default=1)
forum_parser.add_argument('userId', type=int, location='args')
forum_parser.add_argument('searchTerm', type=str, location='args')
forum_parser.add_argument('strategy', choices=['newest', 'hottest', 'popular'], type=str, location='args')


@forum_api.route("/<int:id>/posts")
class GetAllPosts(Resource):
    @forum_api.response(200, "Successfully")
    @forum_api.response(400, "Something wrong")
    @forum_api.expect(forum_parser)
    def get(self, id):
        args = forum_parser.parse_args()
        query = db.session.query(Forum, Post,
                                 func.count(PostComment.id)).outerjoin(PostComment,
                                                                       PostComment.post_id == Post.id).filter(
            Forum.id == id, Post.forum_id == Forum.id).group_by(PostComment.post_id)
        # need to get the users posts
        if args['userId'] is not None:
            query = query.filter(Post.student_id == int(args['userId']))

        if args['searchTerm'] is not None:
            key = args['searchTerm']
            query = query.filter(Post.content.ilike(f'%{key}%'), or_(Post.title.ilike(f'%{key}%')))

        if args['strategy'] is not None and args['strategy'] == 'newest':
            query = query.order(Post.created_time.desc())
        elif args['strategy'] is not None and args['strategy'] == 'hottest':
            yesterday = date.today() - timedelta(days=1)
            query = query.filter(Post.created_time == yesterday).order(func.count(PostComment.id).desc())
        elif args['strategy'] is not None and args['strategy'] == 'popular':
            query = query.order(func.count(PostComment.id).desc())

        # 10 items per page
        index = args['pageNumber'] - 1
        posts = query.offset(index * 10).limit(10).all()
        result = []
        for fourm, post, count in posts:
            data = convert_object_to_dict(post)
            data['nComments'] = count
            data['authName'] = post.student.user.username
            data['authId'] = post.student.id
            result.append(data)
        return {"result": result}, 200

@forum_api.route("/posts/<id>")
class GetPost(Resource):
    @forum_api.response(200, "Successfully")
    @forum_api.response(400, "Something wrong")
    def get(self, id):
        post = db.session.query(Post).outerjoin(PostComment, PostComment.post_id == Post.id).filter(
            Post.id == id).first()
        if post is None:
            return 400

        data = convert_object_to_dict(post)
        data['nComments'] = len(post.comments)
        data['authName'] = post.student.user.username
        data['avatar'] = post.student.user.avatar
        data['authId'] = post.student.id
        result = {'post': data}
        comments = [comm for comm in post.comments if comm.parent_id == None]
        comments = get_comments(comments, post.comments)
        result['comments'] = comments


        return result, 200

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
    
    

