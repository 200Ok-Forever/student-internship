from flask_restx import Namespace, fields


post = {
    "Title": fields.String(required=True),
    "Author": fields.String(required=True),
    "Content": fields.String(required=True),
    "createdAt": fields.String(required=True),
    "Industry": fields.String(required=True)
}

comment = {
    "userID": fields.Integer(required=True),
    "Content": fields.String(required=True),
    "createdAt": fields.String(required=True),
    "replyID": fields.Integer
}



class ForumAPI:
    
    forum_ns = Namespace("forum", description="Forum related operations.")
    post_data = forum_ns.model("Create Post", post)
    comment_data = forum_ns.model("Create Comment", comment)

    edit = forum_ns.model ("edit",{
        "content":fields.String(required = True)
    })
