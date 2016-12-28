from django.conf import settings
from rest_framework import decorators, exceptions, mixins, status, viewsets
from rest_framework.response import Response

from brus.liste.api.serializers import PersonSerializer, PurchaseSerializer
from brus.liste.models import Person


class ListeViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):

    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    lookup_field = 'name'
    lookup_url_regex = r'[/w/s]+'

    @decorators.list_route(methods=['POST'], serializer_class=PurchaseSerializer)
    def purchase(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = serializer.validated_data['name']

        try:
            person = Person.objects.get(name=name)
            person.withdraw_money(settings.SODA_COST)
            result_serializer = PersonSerializer(person)
            return Response(result_serializer.data, status=status.HTTP_201_CREATED)
        except (Person.DoesNotExist, Person.MultipleObjectsReturned):
            raise exceptions.NotFound
