from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

from brus.settings import SODA_COST

from .forms import add_person_form, deposit_form
from .models import Person, Transactions


@login_required
def index(request):
    persons = Person.objects.all().order_by('name')
    total_balance = 0
    for person in persons:
        total_balance += person.balance
    context = {
        'persons': persons,
        'total_balance': total_balance,
        'deposit_form': deposit_form(),
        'add_person_form': add_person_form()
    }
    return render(request, 'brus/index.html', context)


@login_required
def transactions(request, name_id):
    person = Person.objects.get(id=name_id)
    transactions = Transactions.objects.filter(person=person).order_by('-date')

    context = {
        'deposit_form': deposit_form(),
        'person': person,
        'transactions': transactions
    }
    return render(request, 'brus/transactions.html', context)


@login_required
def detail(request, name_id):
    name = Person.objects.get(id=name_id).name
    return HttpResponse("Navn %s: %s" % (name_id, name))


@login_required
def pay(request, name_id):
    person = Person.objects.get(id=name_id)
    person.withdraw_money(SODA_COST)
    return HttpResponseRedirect("/")


@login_required
def deposit(request, name_id):
    form = deposit_form(request.POST)
    if form.is_valid():
        person = Person.objects.get(id=name_id)
        amount = form.cleaned_data['deposit_amount']
        if amount < 600:
            person.deposit_money(form.cleaned_data['deposit_amount'])

    return HttpResponseRedirect("/")


@login_required
def depositFromTransactions(request, name_id):
    form = deposit_form(request.POST)
    if form.is_valid():
        person = Person.objects.get(id=name_id)
        person.deposit_money(form.cleaned_data['deposit_amount'])

    return HttpResponseRedirect("/"+name_id+"/transactions/")


@login_required
def addPerson(request):
    form = add_person_form(request.POST)
    if form.is_valid():
        initial_balance = form.cleaned_data.pop('initial_balance')
        person = Person.objects.create(**form.cleaned_data)
        person.deposit_money(initial_balance)
    return HttpResponseRedirect("/")
