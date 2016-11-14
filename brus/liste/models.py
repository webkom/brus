from django.db import models

from brus.settings import SODA_COST


class Person(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def deposit_money(self, amount):
        self.transactions.create(value=amount)
        self.save()

    def withdraw_money(self, amount):
        self.transactions.create(value=-amount)
        self.save()

    @property
    def balance(self):
        balance = 0
        for transaction in self.transactions.all():
            balance += transaction.value
        return balance

    def sodas_bought(self):
        sodas_bought = 0
        for transaction in self.transactions.all():
            if transaction.value == -SODA_COST:
                sodas_bought += 1
        return sodas_bought

    def __str__(self):
        return '%s %s' % (self.name, self.balance)


class Transactions(models.Model):
    person = models.ForeignKey(Person, related_name='transactions')
    value = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
