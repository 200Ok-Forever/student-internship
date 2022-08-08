from .. import db

forum_list = [
    '',
    'general',
    'arts',
    'business',
    'engineering',
    'finance',
    'law',
    'medicine',
    'science']


class Forum(db.Model):
    __tablename__ = 't_forum'
    id = db.Column(db.Integer, db.ForeignKey('t_industry.id'), nullable=False, primary_key=True)
    name = db.Column('name', db.String(255), nullable=False)
    # image = db.Column('image', db.TEXT, nullable=False)
    posts = db.relationship('Post', backref='forum', lazy=True)
    industry = db.relationship('Industry', backref='forum', lazy=True)

    def __repr__(self):
        return f"<Forum: id: {self.id}, name: {self.name}>"

    def __init__(self, name, image):
        self.name = name
        self.image = image


class Post(db.Model):
    __tablename__ = 't_post'
    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    title = db.Column('title', db.String(255), nullable=False)
    content = db.Column('content', db.String(10000), nullable=False)
    created_time = db.Column('created_time', db.DateTime, nullable=False)

    forum_id = db.Column('forum_id', db.Integer, db.ForeignKey('t_forum.id'), nullable=False)
    student_id = db.Column('student_id', db.Integer, db.ForeignKey('t_students.id'), nullable=False)

    comments = db.relationship('PostComment', backref='post', lazy=True)

    def __repr__(self):
        return f"<Forum: id: {self.id}, user id: {self.student_id}>"

    def __init__(self, title, content, create_time, forum_id, student_id):
        self.title = title
        self.content = content
        self.created_time = create_time
        self.forum_id = forum_id
        self.student_id = student_id


class PostComment(db.Model):
    __tablename__ = 't_post_comment'
    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    student_id = db.Column('student_id', db.Integer, db.ForeignKey('t_students.id'), nullable=False)
    post_id = db.Column('post_id', db.Integer, db.ForeignKey('t_post.id'), nullable=False)
    parent_id = db.Column('parent_id', db.Integer, db.ForeignKey('t_post_comment.id'), nullable=False)
    created_time = db.Column('created_time', db.String(256), nullable=False)
    content = db.Column('content', db.String(10000), nullable=False)
    order = db.Column('order', db.Integer, nullable=False)
    comments = db.relationship('PostComment', remote_side=[id])

    def __repr__(self):
        return f"<Forum: id: {self.id}, user id: {self.student_id}>"

    def __init__(self, student_id, post_id, parent_id, created_time, content):
        self.student_id = student_id
        self.post_id = post_id
        self.parent_id = parent_id
        self.created_time = created_time
        self.content = content
