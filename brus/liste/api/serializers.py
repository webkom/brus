from rest_framework import serializers

from ..models import Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ("name", "balance", "soda_bottles_bought", "soda_cans_bought")


class PurchaseSerializer(serializers.Serializer):

    name = serializers.CharField()
