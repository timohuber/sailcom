from datetime import timedelta

from ..boat.models import Boat


def calculate_duration(from_date_time, until_date_time):
    duration = until_date_time - from_date_time
    less_24 = duration.days == 0

    dt_start = from_date_time.date()
    dt_end = until_date_time.date()
    dt_current = dt_start
    weekday_count = 0
    weekend_count = 0

    # loop through days to count weekend days and weekdays
    if not less_24:
        while dt_current <= dt_end:
            if dt_current.isoweekday() > 5:
                weekend_count += 1
            else:
                weekday_count += 1
            dt_current = dt_current + timedelta(1)  # add 1 day to current day

    return {
        'weekday_count': weekday_count,
        'weekend_count': weekend_count,
        'duration': duration
    }


def calculate_price(weekday_count, weekend_count, from_date_time, duration, boat_id):
    if weekday_count is not None:
        if weekday_count + weekend_count == 0:  # hourly rate calculation
            if from_date_time.date().isoweekday() < 6:  # 1-5 Mon-Fri
                price = float(Boat.objects.get(id=boat_id).price_hour_weekday) * float(
                    duration.seconds / 60 / 60)
            else:
                price = float(Boat.objects.get(id=boat_id).price_hour_weekend) * float(
                    duration.seconds / 60 / 60)
        else:  # daily rate calculation
            price = weekday_count * float(Boat.objects.get(id=boat_id).price_fullday_weekday) \
                    + weekend_count * float(Boat.objects.get(id=boat_id).price_fullday_weekend)

        return price
