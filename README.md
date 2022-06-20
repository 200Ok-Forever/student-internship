# Student Internship

- Frontend domain: https://200okforever.netlify.app/
  - Already setup continuous deployment. Will automatically deploy when there is something new merged to main branch so no action needed.
- Remember to create new breanch when you start ur work:)
- Each pr should nominate one or two reviewers


## Google job search API
- **5000 requests/month and 100 requests/s**
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
