#!/usr/bin/env python3
import datetime
import calendar


def print_phase(phase_name, date_text_start, date_text_end):
    date_start = datetime.datetime.strptime(date_text_start, "%d%b%Y %H:%M:%S")
    date_end = datetime.datetime.strptime(date_text_end, "%d%b%Y %H:%M:%S")
    date_start_utc = calendar.timegm(date_start.utctimetuple())
    date_end_utc = calendar.timegm(date_end.utctimetuple())
    days = int((date_end_utc - date_start_utc)/60/60/24)
    print(phase_name, date_start, date_start_utc, date_end, date_end_utc, days)


print_phase("phase45", "31DEC2017 23:59:59", "31JAN2018 23:59:59")
print_phase("phase40", "01FEB2018 00:00:00", "14FEB2018 23:59:59")
print_phase("phase30", "15FEB2018 00:00:00", "24FEB2018 23:59:59")
print_phase("phase20", "25FEB2018 00:00:00", "06MAR2018 23:59:59")
print_phase("phase15", "07MAR2018 00:00:00", "16MAR2018 23:59:59")
print_phase("phase10", "17MAR2018 00:00:00", "26MAR2018 23:59:59")
print_phase("phase00", "27MAR2018 00:00:00", "16APR2018 23:59:59")

