from django import forms
from django.forms import ModelForm

from .models import Person


class deposit_form(forms.Form):
    deposit_amount = forms.DecimalField(label='kr',
                                        widget=forms.NumberInput(attrs={'class': 'form-control',
                                                                        'placeholder': 'kr.'}),
                                        max_digits=6,
                                        decimal_places=2)


class add_person_form(ModelForm):
    initial_balance = forms.DecimalField()

    class Meta:
        model = Person
        fields = ['name']
