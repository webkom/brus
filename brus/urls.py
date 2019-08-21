from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views

import brus.settings as settings

from .router import router as api_router

urlpatterns = [
    url(r"^admin/", admin.site.urls),
    url(r"^", include("brus.liste.urls", namespace="liste")),
    url(r"^accounts/login", auth_views.login, name="login"),
    url(r"^accounts/logout", auth_views.logout, {"next_page": "/"}, name="logout"),
    url(r"^api/", include(api_router.urls, namespace="api")),
    url("", include("social_django.urls", namespace="social")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
