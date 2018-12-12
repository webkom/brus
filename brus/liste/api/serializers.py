from rest_framework import serializers

from ..models import Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ("name", "balance")


class PurchaseSerializer(serializers.Serializer):

    name = serializers.CharField()
