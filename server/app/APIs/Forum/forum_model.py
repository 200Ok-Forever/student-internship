from flask_restx import Namespace, fields


class ForumAPI:
    forum_ns = Namespace("forum", description="Forum related operations.")

