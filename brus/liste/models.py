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
