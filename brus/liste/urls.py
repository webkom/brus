from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<name_id>[0-9]+)/$', views.detail, name='navn'),
    url(r'^(?P<name_id>[0-9]+)/penger/$', views.penger, name='penger'),
    url(r'^(?P<name_id>[0-9]+)/betale/$', views.pay, name='betale'),
    url(r'^(?P<name_id>[0-9]+)/deposit/$', views.deposit, name='deposit'),
    url(r'^addPerson/$', views.addPerson, name='addPerson'),
    url(r'^(?P<name_id>[0-9]+)/delete/$', views.deletePerson, name='deletePerson')
]
