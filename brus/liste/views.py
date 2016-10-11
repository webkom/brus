from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect

from .forms import AddPersonForm, DepositForm
from .models import Person, Transactions


@login_required
def index(request):
    persons = Person.objects.all().order_by('-name')
    context = {
        'persons': persons,
        'depositForm': DepositForm(),
        'addForm': AddPersonForm()
    }
    return render(request, 'brus/index.html', context)

@login_required
def transactions(request, name_id):
    person = Person.objects.get(id=name_id)
    transactions = Transactions.objects.filter(person=person).order_by('-date')
    context = {
        'depositForm': DepositForm(),
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
    person.withdraw_money(16)
    return HttpResponseRedirect("/")


@login_required
def deposit(request, name_id):
    form = DepositForm(request.POST)
    if form.is_valid():
        person = Person.objects.get(id=name_id)
        person.deposit_money(form.cleaned_data['deposit_amount'])

    return HttpResponseRedirect("/")

@login_required
def depositFromTransactions(request, name_id):
    form = DepositForm(request.POST)
    if form.is_valid():
        person = Person.objects.get(id=name_id)
        person.deposit_money(form.cleaned_data['deposit_amount'])

    return HttpResponseRedirect("/"+name_id+"/transactions/")


@login_required
def addPerson(request):
    form = AddPersonForm(request.POST)
    if form.is_valid():
        form.save()
    return HttpResponseRedirect("/")
