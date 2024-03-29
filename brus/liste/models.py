import decimal
import json
import math

import paho.mqtt.publish as publish
import requests
from django.db import models
from django.db.models import Sum

from brus.settings import (
    MQTT_CLIENT,
    MQTT_HOST,
    MQTT_PASSWORD,
    MQTT_PORT,
    MQTT_TLS,
    MQTT_USERNAME,
    PRODUCT_LIST,
    SLACK_RELAY_URL,
)


def format_slack_message(person, product_name, count):
    # TODO: Add purchase history list
    if count > 0:
        return (
            f"{person.name} har kjøpt {count}x {product_name}, {person.name} sin nye saldo er "
            f"{person.balance} kr."
        )
    return (
        f"{person.name} har fylt på {count}x {product_name} i kjøleskapet, {person.name} sin nye "
        f"saldo er {person.balance} kr. BRA JOBBA!!!"
    )


def post_slack_notification(person, product_name="", count=1, success=True):
    if SLACK_RELAY_URL is None:
        print("Envrionment variable SLACK_RELAY_URL is None, not sending notification.")
        return

    print("Sending Slack notification...")

    if success:
        requests.post(
            SLACK_RELAY_URL,
            timeout=10,
            json={
                "text": format_slack_message(person, product_name, count),
                "username": "brus",
                "icon_emoji": ":cup_with_straw:",
                "channel": "#2-brus",
            },
            headers={"Content-Type": "application/json"},
        )
    else:
        requests.post(
            SLACK_RELAY_URL,
            timeout=10,
            json={
                "text": f"{person.name} har hatt negativ saldo for lenge!! Go buy some :dahls:",
                "username": "brus",
                "icon_emoji": ":cup_with_straw:",
                "channel": "#2-brus",
            },
            headers={"Content-Type": "application/json"},
        )

    print("Published purchase notification slack")


def publish_mqtt_notification(person, product_name="", count=1, success=True):
    if MQTT_HOST is None:
        print("Envrionment variable MQTT_HOST is None, not sending notification.")
        return

    print("Sending MQTT notification...")

    notification_message = (
        f"{person.name} kjøpte {count}x{product_name}. Ny saldo {person.balance}"
    )
    if count < 0:
        notification_message = (
            f"{person.name} fylte {count}x{product_name} i kjøleskapet. "
            + f"BRA! Ny saldo {person.balance}"
        )

    MQTT_AUTH = {"username": MQTT_USERNAME, "password": MQTT_PASSWORD}

    tls = None
    if MQTT_TLS:
        tls = {"ca_certs": None}

    publish.single(
        topic="notification/brus_success" if success else "notification/brus_error",
        payload=(
            notification_message
            if success
            else f"{person.name} har hatt negativ saldo for lenge!!! Go buy some :dahls:"
        ),
        qos=0,
        retain=False,
        hostname=MQTT_HOST,
        port=MQTT_PORT,
        client_id=MQTT_CLIENT,
        keepalive=10,
        auth=MQTT_AUTH,
        tls=tls,
    )
    if not success:
        text = (
            f"{person.name} har hatt negativ saldo for lenge!!! Go buy some :dahls:",
        )
        publish.single(
            topic="office_speaker/command",
            payload=(json.dumps({"command": "say", "text": text})),
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
    if success:
        publish.single(
            topic="fridge/shopping_cart",
            payload="[]",
            qos=0,
            retain=False,
            hostname=MQTT_HOST,
            port=MQTT_PORT,
            client_id=MQTT_CLIENT,
            keepalive=10,
            auth=MQTT_AUTH,
            tls=tls,
        )


class Person(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def deposit_money(self, amount):
        self.transactions.create(value=amount)
        self.save()

    def withdraw_money(self, amount, count=1):
        for i in range(abs(count)):
            self.transactions.create(
                value=-amount * decimal.Decimal(math.copysign(1, count))
            )
        self.save()

        for product_name, product_data in PRODUCT_LIST.items():
            if amount == product_data["current_price"]:
                publish_mqtt_notification(self, product_data["name"], count)
                post_slack_notification(self, product_data["name"], count)

    @property
    def balance(self):
        return self.transactions.all().aggregate(Sum("value"))["value__sum"]

    def purchase_summary(self):
        products_bought = self.products_bought()
        summary = {}
        for product in products_bought:
            if product["product_type"] not in summary.keys():
                summary[product["product_type"]] = product["count"]
            else:
                summary[product["product_type"]] += product["count"]
        return summary

    def products_bought(self):
        products_bought = {}
        for product_name, product_data in PRODUCT_LIST.items():
            products_bought[product_name] = {
                **product_data,
                **{"count": 0, "key": product_name},
            }

        for transaction in self.transactions.all():
            for product_name, product_data in products_bought.items():
                if abs(transaction.value) in product_data["price_history"]:
                    products_bought[product_name]["count"] += 1
        return products_bought.values()

    def __str__(self):
        return "%s %s" % (self.name, self.balance)


class Transactions(models.Model):
    person = models.ForeignKey(Person, related_name="transactions")
    value = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
