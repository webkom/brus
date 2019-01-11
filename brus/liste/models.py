from django.db import models

from brus.settings import (
    SODA_COST_BOTTLE,
    SODA_COST_BOTTLE_CURRENT,
    SODA_COST_CAN,
    SODA_COST_CAN_CURRENT,
)
from brus.utils import SODA_TYPE_BOTTLE, SODA_TYPE_CAN, post_notification_to_slack


class Person(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def deposit_money(self, amount):
        self.transactions.create(value=amount)
        self.save()

    def withdraw_money(self, amount):
        self.transactions.create(value=-amount)
        self.save()

        if amount == SODA_COST_BOTTLE_CURRENT:
            post_notification_to_slack(self, SODA_TYPE_BOTTLE)
        elif amount == SODA_COST_CAN_CURRENT:
            post_notification_to_slack(self, SODA_TYPE_CAN)

    @property
    def balance(self):
        balance = 0
        for transaction in self.transactions.all():
            balance += transaction.value
        return balance

    def soda_bottles_bought(self):
        sodas_bought = 0
        for transaction in self.transactions.all():
            if abs(transaction.value) in SODA_COST_BOTTLE:
                sodas_bought += 1
        return sodas_bought

    def soda_cans_bought(self):
        sodas_bought = 0
        for transaction in self.transactions.all():
            if abs(transaction.value) in SODA_COST_CAN:
                sodas_bought += 1
        return sodas_bought

    def __str__(self):
        return "%s %s" % (self.name, self.balance)


class Transactions(models.Model):
    person = models.ForeignKey(Person, related_name="transactions")
    value = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
