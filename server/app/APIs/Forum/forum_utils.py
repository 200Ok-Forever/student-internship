from json import dumps
from sqlalchemy import null
from ...Models.forum import Post
from ...extension import db


class ForumUtils:
    @staticmethod
    def deletepost(id):
        try:
            obj = db.session.query(Post).filter(Post.id == id).first()
            db.session.delete(obj)
            db.session.commit()
            return {'message': 'delete successfully'}, 200
        except Exception as error:

            return {'msg': error}, 400
        pass

    @staticmethod
    def editPost(id, args):
        try:
            print(args['content'])
            post = db.session.query(Post).filter(Post.id == id).update({Post.content: args['content']})

            db.session.commit()
            return {'message': 'update successfully'}, 200
        except Exception as error:
            print(error)
            return dumps({'msg': error}), 400


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
