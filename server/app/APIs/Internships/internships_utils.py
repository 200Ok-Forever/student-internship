
from plistlib import UID
from sys import intern
from flask import jsonify
import requests
import re
from json import dumps
from requests import session
from sqlalchemy import null
from torch import is_same_size
from ...Models.model import Calendar, StudentSkills,Internship, City, Company, Comment, User, Skill,InternshipStatus,Student
from flask_restx import Resource, reqparse
from ...extension import db
from string import digits
import datetime
from sqlalchemy.sql.functions import coalesce
from sqlalchemy import nullslast
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity
# YOUTUBE_KEY='AIzaSyAKgaoxXGkDNj1ouC4gW2Ks-_Mrw8eMuyM'
YOUTUBE_KEY = 'AIzaSyBKUlq8KO324Q996DMDXKLVnxGtvHKKPmk'



def get_location(data):
    id = City.id
    city = City.query.filter_by(id = data).first()
    if city:
        return city.name
    else:
        return ""

def get_comany_info(data):
    id = Company.id
    company = Company.query.filter_by(id = data).first()
   
    print(company)
    name = company.company_name
    logo = company.company_logo
    
    return name, logo

def get_youtube(title):
    #remove stop words from title
    stop_words = ['intern', 'internship', 'summer']
   
    querywords = title.split()

    resultwords  = [word for word in querywords if word.lower() not in stop_words]
    result = ' '.join(resultwords)

    #translate digits to None
    result = re.sub('[^A-Za-z ]+', '', result)

    #add courses to the search keywords
    res = result+' courses'
    print(res)
    video_id_list = []
    search_url = 'https://www.googleapis.com/youtube/v3/search'

    search_params={
        'key':YOUTUBE_KEY,
        'q':res,
        'part': 'snippet',
        'maxResult':10,
        'type':'video'
    }
    r = requests.get(search_url, params = search_params)
    
    results=r.json()['items']
    # print(results)

    if results == None:
        return 404
      
    for result in results:
        # print(result)
        videoid=result.get('id').get('videoId')
        print(videoid)
        video_id_list.append(videoid)

    return video_id_list
    
def changeTypeFormat(type):
    type = str(type)
    type1 = "fulltime"
    type2 = "parttime"
    if (type.lower() == type1) or (type.lower() == type2):
        return type
    else:
        return ""

def get_all_parent_comment(comments):
    all_parent_comment = []
    
    
    for comment in comments:
        children_comment = db.session.query(Comment).filter(Comment.parent_id == comment.id).all()
        children_comment_list = get_children_comment(children_comment)
        # print(children_comment_list)
        all_parent_comment.append({
            'text': comment.content,
            'uid': comment.user_id,
            'cmtId': comment.id,
            'time': str(comment.date),
            'replied': children_comment_list
        })
    return all_parent_comment
def get_children_comment(comments):
    all_children_comment=[]
    for comment in comments:
        all_children_comment.append({
        'repliedId':comment.id,
        'text':comment.content,
        'time': str(comment.date),
        'uid':comment.user_id},)
 
    # print(all_children_comment)
    return all_children_comment
def changeDateFormat(date):
    
    result = re.sub('T.+', '', str(date))
    return result
class InternshipsUtils:
    def get_Internship(data):
        id = Internship.id
        try:
            # print(id)
            internship=Internship.query.filter(id==data).first()
            # print(internship)
            if not internship:
                internship_not_found={
                    "message": "This internship does not exist"
                }
                return internship_not_found, 404
            else:
                comment_list = []
                comment = db.session.query(Comment).join(Internship, Comment.internship_id == Internship.id).filter(Comment.internship_id==data).filter(Comment.parent_id==0).all()
                print("_________")
                
                if comment:
                    comment_list = get_all_parent_comment(comment)
                    print(comment_list)
                # job_skill = db.session.query(Skill).filter(Skill.internships.any(id = data)).all()
                # skills_list = []
                
                # if job_skill:
                #     for skill in job_skill:
                #         skills_list.append(skill.name)
                #     print(skills_list)
                video_id_list=get_youtube(internship.title)
                if video_id_list == 404:
                    return {'msg': "API KEY PROBELMS"},404

                intership_result = {
                    "description": internship.description,
                    "postedDate": changeDateFormat( internship.posted_time),
                    "closedDate": changeDateFormat( internship.expiration_datetime_utc),
                    "companyId": internship.company_id,
                    'internship_id':internship.id,
                    "comment":comment_list,
                    "jobTitle": internship.title,
                    "jobType": changeTypeFormat(internship.type),
                    "remote": internship.is_remote,
                    "min_salary": internship.min_salary,
                    "max_salary":internship.max_salary,
                    "salary_currency": internship.salary_curreny,
                    "location": get_location(internship.city),
                    "companyName": get_comany_info(internship.company_id)[0],
                    'company_logo': get_comany_info(internship.company_id)[1],
                    "video_id": video_id_list,
                    "recruiting_process":[]
                }
                return intership_result, 200
        except  Exception as error:
            print(error)
            return{
                "message": "something wrong internal"
            },500

    def get_all_Intership(data):
        
        job = data.get("job",None)
        # location = data['location']
        location = data.get("location", None)
        sort = data.get("sort", "Default")
        paid = data.get("paid", None)
        remote = data.get("is_remote", None)
        
        if paid:
            paid = paid.upper()
        if remote:
            remote = remote.upper()
       
        job_type = data.get("job_type", None)
        current_page = int(data.get('current_page',1))
        map = []
  
     
        if job!=None :
            job = data['job']
            map.append(Internship.title.ilike(f'%{job}%'))
        if paid == "TRUE":
            map.append(Internship.min_salary!="")
        if paid == "FALSE":
            map.append(Internship.max_salary == "")
        if remote =="TRUE" or remote == "FALSE":
            print(remote)
            map.append(Internship.is_remote == remote)
        if job_type != None:
            map.append(Internship.type.ilike(f'%{job_type}%'))
        
        # print(map)
 
        if location != None:
            location = data['location']
            
            temp = db.session.query(Internship.id).join(City).filter(City.name.ilike(f'%{location}%')).subquery()
     
            if sort == "Default":
                result = Internship.query.filter(*map).filter(Internship.id.in_(temp)).order_by(Internship.id.asc())
                
            elif sort == "Newest":
                result = Internship.query.filter(*map).filter(Internship.id.in_(temp)).order_by(Internship.posted_time.desc())
                
            elif sort == "Closing Soon":
                result = Internship.query.filter(*map).filter(Internship.id.in_(temp)).order_by(Internship.expiration_datetime_utc == None,Internship.expiration_datetime_utc.asc())
            
            
        elif location ==None:
            if sort == "Default":
                result = Internship.query.filter(*map).order_by((Internship.id.asc()))
                
            elif sort == "Newest":
                result = Internship.query.filter(*map).order_by((Internship.posted_time.desc()))
                
            elif sort == "Closing Soon":
                result = Internship.query.filter(*map).order_by(Internship.expiration_datetime_utc == None,Internship.expiration_datetime_utc.asc())
        
        count = result.count()
        print(count)
        internships=result.paginate(page=current_page, per_page=10, error_out = False).items

        all_internships = [{'job_id': internship.id,'title':internship.title, \
             'job_type': changeTypeFormat(internship.type),"status": "",'is_remote':internship.is_remote , 'posted_time':changeDateFormat( internship.posted_time), 'closed_time':changeDateFormat(internship.expiration_datetime_utc),\
                'min_salary':internship.min_salary, 'max_salary': internship.max_salary, 'description':internship.description,   "salary_currency": internship.salary_curreny,\
                
                    'numAllResults': {"total_count":count}, 'location': get_location(internship.city), 'company_id': internship.company_id,\
                        'company_name': get_comany_info(internship.company_id)[0], 'company_logo': get_comany_info(internship.company_id)[1]
           } for internship in internships]
        
        return jsonify(all_internships)
        

    def comment(id, data):
        result = Internship.query.filter(Internship.id==id).first()
        # current_user_id = get_jwt_identity()
        # print(current_user_id)
        if result != None:
           
            ct = datetime.datetime.now()
            
            newComment = Comment(content = data['comment'], parent_id = data['parent_id'],internship_id = id, user_id = data['uid'], date = ct)
            try:
                db.session.add(newComment)
                db.session.commit()
               
                return dumps({'message':'yes', 'comment_id': newComment.id}),200
            except Exception as error:
                
                return dumps({'msg': error}),400
           
            
        return dumps({'msg': 'no related internship'})

    def appliedfor(arg):
        #id = arg['id']
        
        #uid should not be 102, should change later
        is_applied = db.session.query(Internship).join(InternshipStatus, Internship.id == InternshipStatus.intern_id)\
        .filter(InternshipStatus.uid==102).filter(InternshipStatus.is_applied=="True").all()
        if is_applied:
            info = []
            for applied in is_applied:
                info.append(Internship.get_info(applied))
            result = {
                "is_applied": info
            }
            return result,200
        else:
            return dumps({"msg": "Internship not found"}),404
    def apply(arg):
        internship_id = arg.get('internship_id')
        internship=Internship.query.filter(id==internship_id).first()
        resume = arg.get('resume')
        coverletter = arg.get('coverletter')
        userid = arg.get('userid')
        question = arg.get('question')
        answer = arg.get('answer')
        if internship:
            apply =  db.session.query(InternshipStatus)\
                .filter(InternshipStatus.intern_id == internship_id )\
                .filter(InternshipStatus.uid==102)\
                .update({InternshipStatus.is_applied: "True"})

            db.session.commit()
            return dumps({"msg": "save sucessfully"}),200
        else:

            return dumps({"msg": "Internship not found"}),404

    def getSaveList(arg):

        #id = arg['id']
        #uid should not be 102, should change later
        is_save = db.session.query(Internship)\
            .join(InternshipStatus, Internship.id == InternshipStatus.intern_id)\
        .filter(InternshipStatus.uid==102).filter(InternshipStatus.is_save=="True").all()
        if is_save:
            info =[]
            all_internships = [{'job_id': internship.id,'title':internship.title, \
             'job_type': changeTypeFormat(internship.type),"status": "",'is_remote':internship.is_remote , 'posted_time':changeDateFormat( internship.posted_time), 'closed_time':changeDateFormat(internship.expiration_datetime_utc),\
                'min_salary':internship.min_salary, 'max_salary': internship.max_salary, 'description':internship.description,   "salary_currency": internship.salary_curreny,\
                
                 'location': get_location(internship.city), 'company_id': internship.company_id,\
                        'company_name': get_comany_info(internship.company_id)[0], 'company_logo': get_comany_info(internship.company_id)[1]
           } for internship in is_save]
            # for save in is_save:
            #     info.append(Internship.get_info(save))
            # # print(info)
            result = {
                "is_save": all_internships,

            }
            # print(result)
            return result,200

        else:
            return dumps({"msg": "Internship not found"}),404
    
    def saveInternship(arg):
        internship_id = arg.get('internship_id')
        # (internship_id)
        print(internship_id)
        # #uid will change later, could not be 102
        internship=Internship.query.filter(Internship.id==internship_id).first()
        if not internship:
            return dumps({"msg": "Internship not found"}),404
        update = db.session.query(InternshipStatus)\
            .filter(InternshipStatus.intern_id == internship_id )\
            .filter(InternshipStatus.uid==102)\
            .update({InternshipStatus.is_save: "True"})
        if update:
            db.session.commit()
            return dumps({"msg": "save sucessfully"}),200
        else:
            save_internship = InternshipStatus(uid = 102, intern_id = internship_id, is_save = "True")
            db.session.add(save_internship)
            return dumps({"msg": "add save sucessfully"}),200

    def unSaveInternship(arg):
        internship_id = arg.get('internship_id')
        print(internship_id)
 
        update = db.session.query(InternshipStatus)\
            .filter(InternshipStatus.intern_id == internship_id )\
            .filter(InternshipStatus.uid==102)\
            .update({InternshipStatus.is_save: "False"})
        if update:
            db.session.commit()
            return dumps({"msg": "unsave sucessfully"}),200
        else:
            return dumps({"msg": "Internship not found"}),404

    def getViewedHistory(arg):
        is_seen = db.session.query(Internship).join(InternshipStatus, Internship.id == InternshipStatus.intern_id)\
        .filter(InternshipStatus.uid==102).filter(InternshipStatus.is_seen=="True").all()
        if is_seen:
            info = []
            for applied in is_seen:
                info.append(Internship.get_info(applied))
            result = {
                "is_seen": info
            }
            return result,200
        else:
            return dumps({"msg": "Internship not found"}),404

    def getCalendar(arg):
        get_student = db.session.query(Student).filter(Student.id == 102)
        if not get_student:
            return {
                'msg': 'no related student'
            },400

        calendars = db.session.query(Calendar).filter(Calendar.student_id==102)
        calander_list = []
        if calendars:
            for calendar in calendars:
                calendar_result = {
                    'internship_id':calendar.id,
                    'student_id': calendar.student_id,
                    'start': calendar.start,
                    'end': calendar.end,
                    'title':calendar.title,
                    'type': calendar.type,
                    'link':calendar.link,
                    'is_calendar': calendar.is_calendar
                }
                calander_list.append(calendar_result)

        return calander_list,200

    def addCalendar(arg):
        get_student = db.session.query(Student).filter(Student.id == 102)
        if not get_student:
              return {
                'msg': 'no related student'
            },400
        data = arg
        newCalendar = Calendar(title =data['name'],type=data['type'] \
            ,start = data['start'], end = data['end'],internship_id = data['internshipId'],\
                 user_id = data['uid'])

        try:
            db.session.add(newCalendar)
            db.session.commit()
            
            return dumps({'message':'yes', 'comment_id': newCalendar.id}),200
        except Exception as error:
            
            return dumps({'msg': error}),400
    
    def deleteCalendar(arg):
        get_student = db.session.query(Student).filter(Student.id == 102)
        if not get_student:
              return {
                'msg': 'no related student'
            },400

        obj = Calendar.query.filter_by(id=arg['id']).one()
        try:
            
            session.delete(obj)
            session.commit()
            return dumps({'message':'delete sucessfully'}),200
        except Exception as error:
            
            return dumps({'msg': error}),400
    
    def getRecommend(arg):

        type = arg['type']
      
        get_student = db.session.query(Student).filter(Student.id == 1)
        if not get_student:
            return {
            'msg': 'no related student'
        },400

       
        
        if type == 'recommend':
            internships = db.session.query(Internship).join(StudentSkills, Internship.skills.any(StudentSkills.skill_id)).filter(StudentSkills.student_id == 1)
        elif type == 'closing':
            internships = db.session.query(Internship).join(StudentSkills, Internship.skills.any(StudentSkills.skill_id)).filter(StudentSkills.student_id == 1).order_by(Internship.expiration_datetime_utc == None,Internship.expiration_datetime_utc.asc())
        elif type =='new':
            internships = db.session.query(Internship).join(StudentSkills, Internship.skills.any(StudentSkills.skill_id)).filter(StudentSkills.student_id == 1).order_by((Internship.posted_time.desc()))
       
        all_internships = [{'job_id': internship.id,'title':internship.title, \
             'job_type': changeTypeFormat(internship.type),"status": "",'is_remote':internship.is_remote , 'posted_time':changeDateFormat( internship.posted_time), 'closed_time':changeDateFormat(internship.expiration_datetime_utc),\
                'min_salary':internship.min_salary, 'max_salary': internship.max_salary, 'description':internship.description,   "salary_currency": internship.salary_curreny,\

                    'location': get_location(internship.city), 'company_id': internship.company_id,\
                        'company_name': get_comany_info(internship.company_id)[0], 'company_logo': get_comany_info(internship.company_id)[1]
           } for internship in internships]
        return jsonify(all_internships)
    


       
     