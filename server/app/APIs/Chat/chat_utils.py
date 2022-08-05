import requests


class ChatUtils:
    @staticmethod
    def send_zoom_meeting_invitation(user_id, meeting_id):
        """ Send Zoom meeting invitation link """
        header = {
            "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiJjM2FjYTk0Yi1jODliLTRiMmItOTBhNC04ZTUzNTE3Mjk1ZDYifQ.eyJ2ZXIiOjcsImF1aWQiOiI5NzIxNzMyZTA3ODY4MDkzYmFjMzc0MDk4MWU4YTg5MSIsImNvZGUiOiJmWk94Ym15V0ZJX0Y4TGhFMzcwVFhpNkRzb0RfRmtYQUEiLCJpc3MiOiJ6bTpjaWQ6VzIxVEpDdlRXRUp2WmtTN3FNYkEiLCJnbm8iOjAsInR5cGUiOjAsInRpZCI6MCwiYXVkIjoiaHR0cHM6Ly9vYXV0aC56b29tLnVzIiwidWlkIjoiRjhMaEUzNzBUWGk2RHNvRF9Ga1hBQSIsIm5iZiI6MTY1OTcxMjY0OCwiZXhwIjoxNjU5NzE2MjQ4LCJpYXQiOjE2NTk3MTI2NDgsImFpZCI6IkV3b3BqeVNlU05TTkJtdXlndm1uSVEiLCJqdGkiOiJjMjgzOGRjOC1hZmJiLTQ5OWUtOGNkMS05NTcxYzg3MmEzYjgifQ.MTT2Uul9TYkJFqsgfzJ0eyTmGsgjbJhwGlubJzk-SQEBybIlK3Gp5lPi3rXeUks3noIIrqHYGWBYDiLc46LyPQ"}
        data = {
            "agenda": "My Meeting",
            "default_password": False,
            "duration": 60,
            "password": "123456",
            "pre_schedule": False,
            "recurrence": {
                "end_date_time": "2022-08-06T15:59:00Z",
                "end_times": 7,
                "monthly_day": 1,
                "monthly_week": 1,
                "monthly_week_day": 1,
                "repeat_interval": 1,
                "type": 1,
                "weekly_days": "1"
            }
        }
        response = requests.post("https://api.zoom.us/v2/users/me/meetings", json=data, headers=header)
        return
