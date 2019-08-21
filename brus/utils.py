import re

import paho.mqtt.publish as publish
import requests

from brus.settings import (
    MQTT_CLIENT,
    MQTT_HOST,
    MQTT_PASSWORD,
    MQTT_PORT,
    MQTT_TLS,
    MQTT_USERNAME,
    SLACK_RELAY_URL,
)


def generate_cors_origin_regex_list(domains):
    regex_list = []
    for domain in domains:
        regex_list.append(r"^(https?://)?(.*\.)?{0}$".format(re.escape(domain)))
    return regex_list


def format_slack_message(person, product_name, count):
    # TODO: Add purchase history list
    return (
        f"{person.name} har kjøpt {count}x {product_name}, {person.name} sin nye saldo er "
        f"{person.balance} kr."
    )


def post_slack_notification(person, product_name, count):
    if SLACK_RELAY_URL is None:
        print("Envrionment variable SLACK_RELAY_URL is None, not sending notification.")
        return

    print("Sending Slack notification...")

    requests.post(
        SLACK_RELAY_URL,
        timeout=10,
        json={
            "text": format_slack_message(person, product_name, count),
            "username": "brus",
            "icon_emoji": ":cup_with_straw:",
            "channel": "#brus",
        },
        headers={"Content-Type": "application/json"},
    )
    print("Published purchase notification slack")


def publish_mqtt_notification(person, success=True):
    if MQTT_HOST is None:
        print("Envrionment variable MQTT_HOST is None, not sending notification.")
        return

    print("Sending MQTT notification...")

    # TODO: notification/brus_error

    # notification/brus_success

    notification_message = f"Kjøp for {person.name} godkjent"

    MQTT_AUTH = {"username": MQTT_USERNAME, "password": MQTT_PASSWORD}

    tls = None
    if MQTT_TLS:
        tls = {"ca_certs": None}

    publish.single(
        topic="notification/brus_success" if success else "notification/brus_error",
        payload=notification_message,
        qos=0,
        retain=False,
        hostname=MQTT_HOST,
        port=MQTT_PORT,
        client_id=MQTT_CLIENT,
        keepalive=10,
        auth=MQTT_AUTH,
        tls=tls,
    )
    print("Published purchase notification to MQTT topic 'notification/brus_success'")
