from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=50, unique=True)
    balance = models.IntegerField(default=0)

    def deposit_money(self, amount):
        self.balance += amount
        self.transactions.create(value=amount)
        self.save()


    def withdraw_money(self, amount):
        self.balance -= amount
        self.transactions.create(value=-amount)
        self.save()

    def __str__(self):
        return '%s %s %s' % (self.name, self.balance, self.transactions)

class Transactions(models.Model):
    person = models.ForeignKey(Person, related_name='transactions')
    value = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)



