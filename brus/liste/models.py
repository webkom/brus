from django.db import models


class Brus(models.Model):
    soda = models.CharField(max_length=20)
    cost = models.IntegerField(default=15)

    def __str__(self):
        return '%s %s' % (self.soda, self.cost)


class Person(models.Model):
    name = models.CharField(max_length=50, unique=True)
    balance = models.IntegerField(default=0)

    def setName(self, name):
        self.name = name
        self.save(force_update=name)

    def deposit_money(self, amount):
        self.balance += amount
        self.save()

    def withdraw_money(self, amount):
        self.balance -= amount
        self.save()

    def __str__(self):
        return '%s %s' % (self.name, self.balance)
