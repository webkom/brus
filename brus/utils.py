import re

import requests

from brus.settings import SLACK_RELAY_URL

SODA_TYPE_CAN = "boks"
SODA_TYPE_BOTTLE = "flaske"


def generate_cors_origin_regex_list(domains):
    regex_list = []
    for domain in domains:
        regex_list.append(r"^(https?://)?(.*\.)?{0}$".format(re.escape(domain)))
    return regex_list


def format_slack_message(person, soda_type):
    return (
        f"{person.name} har kjøpt en brus {soda_type}, {person.name} sin nye saldo er "
        f"{person.balance} kr. {person.name} har kjøpt totalt "
        f"{str(person.soda_bottles_bought())} flasker "
        f"og {str(person.soda_cans_bought())} bokser brus."
    )


def post_notification_to_slack(person, soda_type):
    if SLACK_RELAY_URL is None:
        return

    requests.post(
        SLACK_RELAY_URL,
        timeout=10,
        json={
            "text": format_slack_message(person, soda_type),
            "username": "brus",
            "icon_emoji": ":cup_with_straw:",
            "channel": "#brus",
        },
        headers={"Content-Type": "application/json"},
    )
