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
from ...Models.forum import Post, PostComment, forum_list
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
forum_parser.add_argument('industry', type=str, location='args')
forum_parser.add_argument('userId', type=int, location='args')
forum_parser.add_argument('searchTerm', type=str, location='args')
forum_parser.add_argument('sort', choices=['newest', 'hot', 'popular'], type=str, location='args')
auth_parser = reqparse.RequestParser()
auth_parser.add_argument('Authorization', location='headers', help='Bearer [Token]', default='Bearer xxxxxxxxxxx')

@forum_api.route("/posts/<int:postid>")
class GetPost(Resource):
    @forum_api.response(200, "Successfully")
    @forum_api.response(400, "Something wrong")
    def get(self, postid):

        post = db.session.query(Post).outerjoin(PostComment, PostComment.post_id == Post.id).filter(
            Post.id == postid).first()
        if post == None:
            return {"message": "Invalid post id"}, 400
        forum_id = post.forum_id
        result = {}
        if forum_id <= 0 or forum_id >= len(forum_list):
            return {"message": "invalid forum id"}, 400

        result['industry'] = forum_list[forum_id]

        result['post'] = convert_object_to_dict(post)
        comments = post.comments
        result['comments'] = convert_model_to_dict(comments)

        return result, 200


@forum_api.route('/posts')
class AllPost(Resource):
    @forum_api.doc(
        "Get all the post of the given forum with filter",
        responses={
            200: "Successfuly",
            400: "Please provide an industry",
        }
    )
    @forum_api.expect(forum_parser)
    def get(self):
        """ Get all the post of the given forum with filter """
        args = forum_parser.parse_args()
        if args['industry']:
            ind_id = forum_list.index(args['industry'].lower())
            query = db.session.query(Post,
                                     func.count(PostComment.id)).outerjoin(PostComment,
                                                                           PostComment.post_id == Post.id).filter(
                Post.forum_id == ind_id).group_by(PostComment.post_id)
            # need to get the users posts
            if args['userId'] is not None:
                query = query.filter(Post.student_id == int(args['userId']))

            if args['searchTerm'] is not None:
                key = args['searchTerm']
                query = query.filter(or_(Post.title.ilike(f'%{key}%'), Post.content.ilike(f'%{key}%')))

            if args['sort'] is not None and args['sort'] == 'newest':
                query = query.order_by(Post.created_time.desc())
            elif args['sort'] is not None and args['sort'] == 'hot':
                yesterday = date.today() - timedelta(days=1)
                query = query.filter(Post.created_time == yesterday).order_by(func.count(PostComment.id).desc())
            elif args['sort'] is not None and args['sort'] == 'popular':
                query = query.order_by(func.count(PostComment.id).desc())

            # 10 items per page
            index = args['pageNumber'] - 1
            posts = query.offset(index * 10).limit(10).all()
            result = []
            for post, count in posts:
                data = convert_object_to_dict(post)
                data['nComments'] = count
                data['authName'] = post.student.user.username
                data['authId'] = post.student.id
                result.append(data)
            return {"result": result}, 200
        else:
            return {
                       "message": "Please provide an industry"
                   }, 400

    @forum_api.doc(
        " Post a new post",
        responses={
            200: "Successfuly",
            400: "Invalid forum name/Invalid user name",
        }
    )
    @jwt_required()
    @forum_api.expect(ForumAPI.post_data, auth_parser, validate=True)
    def post(self):
        """ Post a new post """
        uid = get_jwt_identity()
        data = forum_api.payload

        if data['Industry'].lower() not in forum_list:
            return {"message": "Invalid forum name"}, 400

        user = db.session.query(User).filter(User.username == data['Author']).first()

        fourm_id = forum_list.index(data['Industry'].lower())

        if user == None or user.uid != uid:
            return {"message": "Invalid user name"}, 400

        new_post = Post(data["Title"], data['Content'], data['createdAt'], fourm_id, uid)
        db.session.add(new_post)
        db.session.commit()

        return {"postid": new_post.id}, 200


@forum_api.route('/posts/<postid>/comment')
class CreateComment(Resource):
    @forum_api.doc(
        " Comment to the given post",
        responses={
            200: "Successfuly",
            400: "Invalid user id/Post id invalid/Parent comment id invalid",
        }
    )
    @jwt_required()
    @forum_api.expect(ForumAPI.comment_data, validate=True)
    def post(self, postid):
        """ Comment to the given post """
        uid = get_jwt_identity()
        data = forum_api.payload

        if uid != data['userID']:
            return {"message": "Invalid user id"}, 400

        # check post
        post = db.session.query(Post).filter(Post.id == postid).first()
        if post is None:
            return {"message": "Post id invalid"}, 400
        # check comment
        if data['replyID'] is not None:
            comment = db.session.query(PostComment).filter(PostComment.id == data['replyID']).first()
            if comment is None:
                return {"message": "Parent comment id invalid"}, 400

        new_comm = PostComment(data['userID'], postid, data['replyID'], data['createdAt'], data['Content'])
        db.session.add(new_comm)
        db.session.commit()
        return {"message": "Successfully"}, 200



@forum_api.route("/posts/<int:id>")
class EditAndDeletePost(Resource):
    @jwt_required()
    @forum_api.expect(auth_parser)
    def delete(self, id):
        return ForumUtils.deletepost(id)



    @jwt_required()
    @forum_api.expect(ForumAPI.edit, auth_parser)
    @forum_api.doc(
        " Edit the given post",
        responses={
            200: "Edit Successfuly",
            400: "Error",
        }
    )
    def patch(self, postid):
        """ Edit the given post """
        content = request.get_json()
        print(content)
        return ForumUtils.editPost(id, content)

