from flask import jsonify
from sqlalchemy import null
from ...Models.model import Internship, City, Company
from flask_restx import Resource, reqparse
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

class InternshipsUtils:
    def get_Internship(data):
        id=data
        try:
            internship=Internship.query.filter_by(id=id).first()
            print(internship)

            if not internship:
                internship_not_found={
                    "message": "This internship does not exist"
                }

                return internship_not_found, 404
            else:

                intership_result = {
                    "description": internship.description,
                    "postedDate": internship.posted_time,
                    "closedDate": internship.expiration_timestamp,
                    "companyId": internship.company_id
              
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
        if sort == "Default":
            result = Internship.query.filter(*map).order_by(Internship.id.asc())
            
        elif sort == "Newest":
            result = Internship.query.filter(*map).order_by(Internship.posted_time.desc())
            
        elif sort == "Closing Soon":
            result = Internship.query.filter(*map).order_by(Internship.expiration_timestamp.desc())
        
        count = result.count()
        internships=result.paginate(page=current_page, per_page=15, error_out = False).items
        

        all_internships = [{'job_id': internship.id,'title':internship.title, 'expiration_timestamp': internship.expiration_timestamp, \
             'job_type': internship.type,'is_remote':internship.is_remote , 'posted_time': internship.posted_time,\
                'min_salary':internship.min_salary, 'max_salary': internship.max_salary, 'description':internship.description,\
                    'numAllResults': {"total_count":count}, 'location': get_location(internship.city),\
                        'company_name': get_comany_info(internship.company_id)[0], 'company_logo': get_comany_info(internship.company_id)[1]

           } for internship in internships]
        return jsonify(all_internships)
     
     
           
        



