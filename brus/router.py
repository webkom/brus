from rest_framework import routers

from .liste.api import views as liste_views

router = routers.DefaultRouter()

router.register(r'liste', liste_views.ListeViewSet, base_name='brus')
