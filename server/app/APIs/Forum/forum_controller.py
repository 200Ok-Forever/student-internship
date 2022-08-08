from ast import In
from datetime import date, timedelta
from xml.etree.ElementTree import Comment
from flask import request, jsonify
from flask_restx import Resource
from ...Models.company import Companies, Industry
from ...Models.model import User
from .forum_model import ForumAPI
from .forum_utils import get_comments
from flask_jwt_extended import jwt_required
from flask_restx import Resource, reqparse
from ... import db
from ...Models.forum import Post, PostComment, Forum, forum_list
from sqlalchemy import and_, null, or_
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import func
from ...Helpers.other_util import convert_object_to_dict, convert_model_to_dict
from ...Models import forum
from .forum_utils import ForumUtils
forum_api = ForumAPI.forum_ns

forum_parser = reqparse.RequestParser()
forum_parser.add_argument('pageNumber', type=int, location='args', default=1)
forum_parser.add_argument('Industry', type=str, location='args', default=1)
forum_parser.add_argument('userId', type=int, location='args')
forum_parser.add_argument('searchTerm', type=str, location='args')
forum_parser.add_argument('strategy', choices=['newest', 'hottest', 'popular'], type=str, location='args')


@forum_api.route("/posts")
class GetAllPosts(Resource):
    @forum_api.response(200, "Successfully")
    @forum_api.response(400, "Something wrong")
    @forum_api.expect(forum_parser)
    def get(self, id):
        args = forum_parser.parse_args()
        ind_id = forum_list.index(data['Industry'].lower())
        query = db.session.query(Post,
                                 func.count(PostComment.id)).outerjoin(PostComment,
                                                                       PostComment.post_id == Post.id).filter(
            Post.forum_id == ind_id).group_by(PostComment.post_id)
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


@forum_api.route('/posts')
class CreatePost(Resource):
    @forum_api.response(200, "Successfully")
    @forum_api.response(400, "Something wrong")
    @jwt_required()
    @forum_api.expect(ForumAPI.post_data, validate=True)
    def post(self):
        uid = get_jwt_identity()
        data = forum_api.payload

        if data['Industry'].lower() not in forum_list:
            return {"message": "Invalid forum name"}, 400

        
        user = db.session.query(User).filter(User.username == data['Author']).first()

        fourm_id = forum_list.index(data['Industry'].lower())

        if user == None or user.id != uid:
            return {"message": "Invalid user name"}, 400

        new_post = Post(data["Title"], data['Content'], data['createdAt'], fourm_id, uid)
        db.session.add(new_post)
        db.session.commit()

        return {"message": "Successfully"}, 200

@forum_api.route('/posts/<postid>/comment')
class CreateComment(Resource):
    @forum_api.response(200, "Successfully")
    @forum_api.response(400, "Something wrong")
    @jwt_required()
    @forum_api.expect(ForumAPI.comment_data, validate=True)
    def post(self, postid):
        uid = get_jwt_identity()
        data = forum_api.payload

        if uid != data['userID']:
            return {"message": "Invalid user name"}, 400

        # check post
        post = db.session.query(Post).filter(Post.id == postid).first()
        if post is None:
            return {"message": "Post id invalid"}, 400
        # check comment
        if data['replyID'] is not None:
            comment = db.session.query(PostComment).filter(PostComment.id == data['replyID']).first()
            if comment is None:
                return {"message": "Parent comment id invalid"}, 400

        new_comm = PostComment(data['userID'], postid, data['replyID'],data['createdAt'], data['Content'])
        db.session.add(new_comm)
        db.session.commit()
        return {"message": "Successfully"},200

patch_parser = reqparse.RequestParser()
# patch_parser.add_argument('content', location = 'body',help='edit content')
patch_parser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxx')
@forum_api.route("/forum/posts/<int:id>")
class EditAndDeletePost(Resource):
    # @jwt_required()
    def delete(self,id):
        # uid = get_jwt_identity()
        return ForumUtils.deletepost(id)

    @jwt_required()
    @forum_api.expect(ForumAPI.edit, patch_parser)
    def patch(self,id):
        content = request.get_json()
        print(content)
        # uid = get_jwt_identity()
        # return "hahahaha"
        return ForumUtils.editPost(id,content)

   
   

