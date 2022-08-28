from django.utils.timezone import utc
import datetime

def dateTimeDiff(createdTime):
    now = datetime.datetime.utcnow().replace(tzinfo=utc)
    print(now)
    diff = now - createdTime
    print(diff)
    return diff.total_seconds()