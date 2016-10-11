from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<name_id>[0-9]+)/pay/$', views.pay, name='pay'),
    url(r'^(?P<name_id>[0-9]+)/deposit/$', views.deposit, name='deposit'),
    url(r'^(?P<name_id>[0-9]+)/depositFromT/$', views.depositFromTransactions, name='depositFromTransactions'),
    url(r'^addPerson/$', views.addPerson, name='add'),
    url(r'^(?P<name_id>[0-9]+)/transactions/$', views.transactions, name='transactions')
]
