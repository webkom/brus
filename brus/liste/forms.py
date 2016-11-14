from django import forms
from django.forms import ModelForm
from .models import Person


class deposit_form(forms.Form):
    deposit_amount = forms.IntegerField(label='kr',
                                        widget=forms.NumberInput(attrs={'class': 'form-control',
                                                                        'placeholder': 'kr.'}))


class add_person_form(ModelForm):
    initial_balance = forms.IntegerField()

    class Meta:
        model = Person
        fields = ['name']
