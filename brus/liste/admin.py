from django.contrib import admin

from .models import Person, Transactions


class PersonModelAdmin(admin.ModelAdmin):
    list_display = ('name',)


admin.site.register(Person, PersonModelAdmin)


class TransactionModelAdmin(admin.ModelAdmin):
    list_display = ('person', 'value', 'date')


admin.site.register(Transactions, TransactionModelAdmin)
