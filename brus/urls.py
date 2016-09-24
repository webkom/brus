from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('brus.liste.urls', namespace='liste')),
    url(r'^accounts/login', auth_views.login, name='login'),
    url(r'^accounts/logout', auth_views.logout, {'next_page': '/'}, name='logout'),
]
