from .. import  db

class Invitation(db.Model):
    __tablename__ = 'r_invitation'
    student_id = db.Column(db.Integer, db.ForeignKey('t_students.id'), nullable=False, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('t_internships.id'), nullable=False, primary_key=True)
    start_time = db.Column( db.String(255), nullable=False)
    zoom_link = db.Column(db.String(10000), nullable=False)
    status = db.Column(db.String(255), nullable = False)
    
    def __init__(self, student_id, internship_id, start_time, zoom_link, status):
        self.student_id = student_id
        self.internship_id = internship_id
        self.internship_id = internship_id
        self.start_time = start_time
        self.zoom_link = zoom_link
        self.status = status

