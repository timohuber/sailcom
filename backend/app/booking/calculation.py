from datetime import timedelta


def calculate_duration(serializer):
    until_date_time = serializer.validated_data.get('until_date_time')
    from_date_time = serializer.validated_data.get('from_date_time')
    duration = until_date_time - from_date_time
    less_24 = duration.days == 0

    dt_start = serializer.validated_data.get('from_date_time').date()
    dt_end = serializer.validated_data.get('until_date_time').date()
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

def calculate_price():
    return 30

