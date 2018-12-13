import requests

from brus.settings import SLACK_RELAY_URL

SODA_TYPE_CAN = "boks"
SODA_TYPE_BOTTLE = "flaske"


def format_slack_message(person, soda_type):
    return (
        f"{person.name} har kjøpt en brus {soda_type}, {person.name} sin nye saldo er "
        "{person.balance}. {person.name} har kjøpt totalt "
        "{person.soda_bottles_bought} flasker og {person.soda_cans_bought} bokser brus."
    )


def post_notification_to_slack(person, soda_type):
    if SLACK_RELAY_URL is None:
        return

    requests.post(
        SLACK_RELAY_URL,
        json={
            "text": format_slack_message(person, soda_type),
            "username": "brus",
            "icon_emoji": ":cup_with_straw:",
            "channel": "#brus",
        },
        headers={"Content-Type": "application/json"},
    )
