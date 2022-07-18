from flask_restx import Namespace, fields


class ForumAPI:
    forum_ns = Namespace("forum", description="Forum related operations.")

    forum_info = forum_ns.model('Forum info', {
        'id': fields.String,
    })
