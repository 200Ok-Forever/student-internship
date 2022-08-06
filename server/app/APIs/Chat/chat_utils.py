import requests
from ...Models.model import User, Student, Company
from ... import db


class ChatUtils:

    @staticmethod
    def send_zoom_meeting_invitation(data):
        """ Send Zoom meeting invitation link """

        uid = data['otherUserId']
        time = data['time']
        user = User.query.filter_by(uid=uid).first()
        if user is not None:
            username = user.username
            header = {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ik4wQlVLUUNVVGtpTjZCZk8yMTZrMWciLCJleHAiOjE2NjAzMzA2MzQsImlhdCI6MTY1OTcyNTgzNH0.PRhZvxCAZDZnZtkD4m11F7z6aGKGXclnvJ-6vDvyBg0"}
            body = {
                "agenda": f"{username}'s Meeting",
                "default_password": False,
                "duration": 60,
                "password": "123456",
                "pre_schedule": False,
                "recurrence": {
                    "end_date_time": time,
                    "end_times": 7,
                    "monthly_day": 1,
                    "monthly_week": 1,
                    "monthly_week_day": 1,
                    "repeat_interval": 1,
                    "type": 1,
                    "weekly_days": "1"
                }
            }
            response = requests.post("https://api.zoom.us/v2/users/me/meetings", json=body, headers=header)
            # response = requests.get("https://api.zoom.us/v2/meetings/me", headers=header, verify=True)
            return response.json(), 200
        else:
            return {"message": "User not found!"}, 404

    def getUser():
        user = db.session.query(User).all()
        results = []
       
        for u in user:
            result = {
                "userid": u.uid,
                "name": u.username,
                "avatar": u.avatar
            }
            results.append(result)
        return results,200
