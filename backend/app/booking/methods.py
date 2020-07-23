from datetime import timedelta, datetime


def calculate_days_hours(from_date_time, until_date_time):
    until_date_time = datetime.strptime(from_date_time, '%Y-%m-%dT%H:%MZ')
    from_date_time = datetime.strptime(until_date_time, '%Y-%m-%dT%H:%MZ')

    duration = until_date_time - from_date_time
    less_24 = duration.days == 0

    dt_start = from_date_time.date()
    dt_end = until_date_time.date()
    dt_current = dt_start
    weekday_count = 0
    weekend_count = 0
    weekday_hours = 0
    weekend_hours = 0

    # loop through days to count weekend days and weekdays
    if not less_24:
        while dt_current <= dt_end:
            if dt_current.isoweekday() > 5:
                weekend_count += 1
            else:
                weekday_count += 1
            dt_current = dt_current + timedelta(1)  # add 1 day to current day

    if from_date_time.date().isoweekday() < 6:
        weekday_hours = float(duration.seconds / 60 / 60)
    else:
        weekend_hours = float(duration.seconds / 60 / 60)
    return weekday_count, weekend_count, weekday_hours, weekend_hours
