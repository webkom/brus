from rest_framework import serializers

from ..models import Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ("name", "balance", "purchase_summary", "products_bought")


class ShoppingCartSerializer(serializers.Serializer):
    product_name = serializers.CharField(required=True)
    count = serializers.IntegerField(required=True)


class PurchaseSerializer(serializers.Serializer):

    name = serializers.CharField(required=True)
    shopping_cart = ShoppingCartSerializer(many=True)
