import decimal

from django.db.models import Sum
from django.utils import timezone
from rest_framework import decorators, exceptions, mixins, status, viewsets
from rest_framework.response import Response

from brus.liste.api.serializers import PersonSerializer, PurchaseSerializer
from brus.liste.models import (
    Person,
    Transactions,
    post_slack_notification,
    publish_mqtt_notification,
)
from brus.settings import BEER_COST_DAHLS_BOTTLE_CURRENT, PRODUCT_LIST


def purchase(name, shopping_cart):
    try:
        person = Person.objects.get(name=name)
        if person.balance < 0:
            current_balance = person.balance
            for txn in person.transactions.filter(
                date__gt=timezone.now() - timezone.timedelta(days=3)
            ).reverse():
                current_balance -= txn.value
                if current_balance >= 0:
                    break

            # If user has not had a positive balance in 3 days return err
            if current_balance < 0:
                publish_mqtt_notification(person, success=False)
                post_slack_notification(person, success=False)

        for cart_item in shopping_cart:
            product_price = PRODUCT_LIST[cart_item["product_name"]]["current_price"]
            person.withdraw_money(product_price, count=cart_item["count"])

        result_serializer = PersonSerializer(person)
        return Response(result_serializer.data, status=status.HTTP_201_CREATED)
    except (Person.DoesNotExist, Person.MultipleObjectsReturned):
        raise exceptions.NotFound


class ListeViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):

    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    lookup_field = "name"
    lookup_url_regex = r"[/w/s]+"

    @decorators.list_route()
    def products(self, request):
        return Response(PRODUCT_LIST.values())

    @decorators.list_route(methods=["POST"], serializer_class=PurchaseSerializer)
    def purchase(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = serializer.validated_data["name"]
        shopping_cart = serializer.validated_data["shopping_cart"]

        # TODO: add mqtt publish fail if user does not exist

        for cart_item in shopping_cart:
            if not cart_item["product_name"] in PRODUCT_LIST.keys():
                return Response(
                    {"product_name": "not_found", "value": cart_item["product_name"]},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return purchase(name, shopping_cart=shopping_cart)
