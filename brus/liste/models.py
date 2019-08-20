from django.db import models

from brus.settings import PRODUCT_LIST
from brus.utils import post_slack_notification, publish_mqtt_notification


class Person(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def deposit_money(self, amount):
        self.transactions.create(value=amount)
        self.save()

    def withdraw_money(self, amount, count=1):
        for i in range(count):
            self.transactions.create(value=-amount)
        self.save()

        publish_mqtt_notification(self)

        for product_name, product_data in PRODUCT_LIST.items():
            if amount == product_data["current_price"]:
                post_slack_notification(self, product_data["name"], count)

    @property
    def balance(self):
        balance = 0
        for transaction in self.transactions.all():
            balance += transaction.value
        return balance

    def products_bought(self):
        products_bought = {}

        for transaction in self.transactions.all():
            for product_name, product_data in PRODUCT_LIST.items():
                key = product_data["name"]
                if abs(transaction.value) in product_data["price_history"]:
                    if key not in products_bought.keys():
                        products_bought[key] = 1
                    else:
                        products_bought[key] += 1

        return products_bought

    def __str__(self):
        return "%s %s" % (self.name, self.balance)


class Transactions(models.Model):
    person = models.ForeignKey(Person, related_name="transactions")
    value = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
