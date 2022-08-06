from ..Models.model import User, Student, Company
import json

# Opening JSON file
f = open('t_company.json')

# returns JSON object as
# a dictionary
data = json.load(f)


def signup_company_quick(data):
    for d in data:
        user = User(
            username=d['company_name'],
            email=d['email'],
            password='123456',
            role=2,
            avatar='',
        )
        company = Company(
            email=d['email'],
            company_name=d['company_name'],
            first_name=d['first_name'],
            last_name=d['last_name'],
            industry=d['industry'],
            linkedin=d['linkedin'],
            company_url=d['company_url'],
            founded_year=d['founded_year'],
            company_size=d['company_size'],
            location=d['location'],
            description=d['description'],
            logo=d['logo']
        )
        company.save()



def signup_student_quick(data):
    pass
