from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

from .forms import AddNameForm, DepositForm
from .models import Brus, Person


@login_required
def index(request):
    persons = Person.objects.all().order_by('-name')
    context = {
        'persons': persons,
        'form1': DepositForm(),
        'formAdd': AddNameForm()
    }
    return render(request, 'brus/index.html', context)


@login_required
def detail(request, name_id):
    navn = Person.objects.get(id=name_id).name
    return HttpResponse("Navn %s: %s" % (name_id, navn))


@login_required
def penger(request, name_id):
    money = Brus.objects.get(id=name_id).money
    return HttpResponse("This is how much money you've got: %s" % money)


@login_required
def pay(request, name_id):
    person = Person.objects.get(id=name_id)
    person.withdraw_money(15)
    return HttpResponseRedirect("/")


@login_required
def deposit(request, name_id):
    person = Person.objects.get(id=name_id)
    person.deposit_money(int(request.POST.get('deposit_amount')))
    return HttpResponseRedirect("/")


@login_required
def addPerson(request):
    Person.objects.create(name=request.POST.get('add_person'))
    return HttpResponseRedirect("/")


@login_required
def deletePerson(request, name_id):
    Person.objects.get(id=name_id).delete()
    return HttpResponseRedirect("/")
