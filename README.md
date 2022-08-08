# Student Internship

- Frontend domain: https://200okforever.netlify.app/

## How to Deploy locally (Clone from Github)
1. Get into the github main page of [student-internship](https://github.com/200Ok-Forever/student-internship).
2. Click the green `Code` button on your right, the copy the HTTPS url.
3. Open your command line, type `git clone` then paste the url, then press enter.
4. On your command line, `cd student-internship` directory, then `cd client`
5. If you haven't install npm, follow this guide to [install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
6. On your command line, `npm install`, (This may take serveral minutes, please be patient)
7. After installing all packages, you may see `9 vulnerabilities (3 moderate, 6 high)` and `To address all issues (including breaking changes), run: npm audit fix --force`, ignoreit
8. On your command line, `npm start` to start the browser (this may take another few minutes)
9. During your waiting time, start another command line, then cd into `/student-internship/server`
10. if you haven't install pip, install pip
11. On your command line, `pip install -r requirements.txt` (this may take another few minutes)
12. try run `flask run`, you may see `ImportError: No module named xxx` (xxx is a particular module name), run `pip install xxx` to install this module. (This step may happened serveral times)
13. If no `ImportError: No module named xxx` exist, instead, you can see `Running on http://127.0.0.1:5004/ (Press CTRL+C to quit)`, this means the backend has been successfully set up.
14. At the same time, check whether you can see `Local: http://localhost:3002` and `On Your Network:  http://192.168.1.24:3002`, in your first command line, this means your front end has been set up, your browser should automatically open the webapp. If not opened, you can manually type `http://localhost:3002` into your browser and open the webapp.

## Google job search API
- **5000 requests/month and 100 requests/s**
- https://rapidapi.com/letscrape-6bRBa3QguO5/api/google-jobs-search/
```python
import requests

url = "https://google-jobs-search.p.rapidapi.com/search"

querystring = {"query":"Full time web developer jobs in new york"}

headers = {
	"X-RapidAPI-Key": "a5da9e2614msh4ff783e33e0d183p1ac95fjsned37eddfa900",
	"X-RapidAPI-Host": "google-jobs-search.p.rapidapi.com"
}

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)
```

## LinkedIn Profiles and Company Data
- To get company info
- https://rapidapi.com/iscraper/api/linkedin-profiles-and-company-data/
- **100 requests/month and 10 requests/min**

```python
import requests

url = "https://linkedin-profiles-and-company-data.p.rapidapi.com/profile-details"

payload = {
	"profile_id": "williamhgates",
	"profile_type": "personal",
	"contact_info": False,
	"recommendations": False,
	"related_profiles": False
}
headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": "a5da9e2614msh4ff783e33e0d183p1ac95fjsned37eddfa900",
	"X-RapidAPI-Host": "linkedin-profiles-and-company-data.p.rapidapi.com"
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)
```

## Youtube API
- To recommend learning course based on jobs
- Use *search* to get tutorials on YouTube
- It should be on Google cloud platform and *have not tested yet*(Should be done before phase1 end)
- https://developers.google.com/youtube/v3/docs/search/list

## Project Management
In this project, we used teams and discord to communicate. Also, multiple meeting has been regularly conducted to catch up everyone's progress.
We collaborately created text version of API documentation and Swagger UI, which make the apis more easy to understand and eases the
communication between the front end team and the back end team. We used Jira Board to conduct product management as well.
<img width="955" alt="image" src="https://user-images.githubusercontent.com/62100969/183334736-b6d88580-ed64-4924-8218-ceb03af417a6.png">
Jira Board  
<img width="825" alt="image" src="https://user-images.githubusercontent.com/62100969/183334990-7e549e85-604e-4572-be04-270a527b3e6e.png">
Teams Chat  
<img width="607" alt="image" src="https://user-images.githubusercontent.com/62100969/183335035-f92a0a9e-2ef1-4a44-b4d0-5c8f038bec3a.png">
Discord Chat  
<img width="646" alt="image" src="https://user-images.githubusercontent.com/62100969/183336252-b6e20ce5-4368-45b5-88c1-c84bb0582225.png">
One of the Meeting Minutes  
<img width="1195" alt="image" src="https://user-images.githubusercontent.com/62100969/183336464-5603c985-9b43-428d-97cf-8812c64d2353.png">
Swagger UI  
[API doc](https://docs.google.com/document/d/1NLNMbSkB_7ZOhxpqY15lnbS8eaYhqX4LKpNnbSYbFoA/edit#heading=h.6jxjxr7tu5qb)  
