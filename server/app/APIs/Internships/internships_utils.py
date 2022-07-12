from sys import intern
from flask import jsonify
import requests
import re
from requests import session
from sqlalchemy import null
from ...Models.model import Internship, City, Company, Comment, User, Skill
from flask_restx import Resource, reqparse
from ...extension import db

# YOUTUBE_KEY='AIzaSyAKgaoxXGkDNj1ouC4gW2Ks-_Mrw8eMuyM'
YOUTUBE_KEY = 'AIzaSyBKUlq8KO324Q996DMDXKLVnxGtvHKKPmk'
def get_location(data):
    id = City.id
    city = City.query.filter_by(id = data).first()
    print(city)
    return city.name

def get_comany_info(data):
    id = Company.id
    company = Company.query.filter_by(id = data).first()
    print(company)
    name = company.name
    logo = company.logo
    return name, logo

def get_youtube(skill_list):
    video_id_list = []
    search_url = 'https://www.googleapis.com/youtube/v3/search'
    skill_list = skill_list[0:2]
    for skill in skill_list:
        print(skill)
        search_params={
            'key':YOUTUBE_KEY,
            'q':skill,
            'part': 'snippet',
            'maxResult':1,
            'type':'video'
        }
        r = requests.get(search_url, params = search_params)
       
        results=r.json()['items']
        print(results)
   
      
        for result in results:
            # print(result)
            videoid=result.get('id').get('videoId')
            print(videoid)
            video_id_list.append(videoid)
    return video_id_list
  
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
            'replied': children_comment_list
        })
    return all_parent_comment

def get_children_comment(comments):
    all_children_comment=[]
    for comment in comments:
        all_children_comment.append({
        'repliedId':comment.id,
        'text':comment.content,
        'uid':comment.user_id})
 
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
                comment = db.session.query(Comment).join(Internship, Comment.internship_id == Internship.id).filter(Comment.internship_id==data).filter(Comment.parent_id==None).all()
                if comment:
                    comment_list = get_all_parent_comment(comment)
                job_skill = db.session.query(Skill).filter(Skill.internships.any(id = data)).all()
                skills_list = []
                
                if job_skill:
                    for skill in job_skill:
                        skills_list.append(skill.name)
                    print(skills_list)
                video_id_list=get_youtube(skills_list)
                intership_result = {
                    "description": internship.description,
                    "postedDate": changeDateFormat( internship.posted_time),
                    "closedDate": changeDateFormat( internship.expiration_datetime_utc),
                    "companyId": internship.company_id,
                    'internship_id':internship.id,
                    "comment":comment_list,
                    "jobTitle": internship.title,
                    "jobType": internship.type,
                    "remote": internship.is_remote,
                    "min_salary": internship.min_salary,
                    "max_salary":internship.max_salary,
                    "salary_curreny": internship.salary_curreny,
                    "location": get_location(internship.id),
                    "companyName": get_comany_info(internship.company_id)[0],
                    'company_logo': get_comany_info(internship.company_id)[1],
                    "video_id": video_id_list
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
        remote = data.get("remote", None)
        job_type = data.get("job_type", None)
        current_page = int(data.get('current_page',1))
        map = []
     
        if job!=None :
            job = data['job']
            map.append(Internship.title.ilike(f'%{job}%'))

        if paid =="True":
            map.append(Internship.min_salary.isnot(None))
        if remote != None:
            map.append(Internship.is_remote == remote)
        if job_type != None:
            map.append(Internship.type.ilike(f'%{job_type}%'))
 

        print(map)
 
        if location != None:
            location = data['location']
            
            temp = db.session.query(Internship.id).join(City).filter(City.name.ilike(f'%{location}%')).subquery()
     
            if sort == "Default":
                result = Internship.query.filter(*map).filter(Internship.id.in_(temp)).order_by(Internship.id.asc())
                
            elif sort == "Newest":
                result = Internship.query.filter(*map).filter(Internship.id.in_(temp)).order_by(Internship.posted_time.desc())
                
            elif sort == "Closing Soon":
                result = Internship.query.filter(*map).filter(Internship.id.in_(temp)).order_by(Internship.expiration_timestamp.desc())
            
            

        elif location ==None:
            if sort == "Default":
                result = Internship.query.filter(*map).order_by(Internship.id.asc())
                
            elif sort == "Newest":
                result = Internship.query.filter(*map).order_by(Internship.posted_time.desc())
                
            elif sort == "Closing Soon":
                result = Internship.query.filter(*map).order_by(Internship.expiration_timestamp.desc())
        
        count = result.count()
        internships=result.paginate(page=current_page, per_page=15, error_out = False).items
        
        all_internships = [{'job_id': internship.id,'title':internship.title, \
             'job_type': internship.type,'is_remote':internship.is_remote , 'posted_time':changeDateFormat( internship.posted_time), 'closed_time':changeDateFormat(internship.expiration_datetime_utc),\
                'min_salary':internship.min_salary, 'max_salary': internship.max_salary, 'description':internship.description,\
                    'numAllResults': {"total_count":count}, 'location': get_location(internship.city), 'company_id': internship.company_id,\
                        'company_name': get_comany_info(internship.company_id)[0], 'company_logo': get_comany_info(internship.company_id)[1]

           } for internship in internships]

        if len(all_internships) == 0:
            internship_not_found={
                "message": "internships not found"
            }

            return internship_not_found, 404
        else:
            return jsonify(all_internships)
     
     
           
        



