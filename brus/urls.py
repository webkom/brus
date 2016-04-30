from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('brus.liste.urls')),
    url(r'^accounts/login', 'django.contrib.auth.views.login', name='login'),
    url(r'^accounts/logout', 'django.contrib.auth.views.logout', name='logout'),
]
