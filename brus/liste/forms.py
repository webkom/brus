from django import forms
from django.forms import ModelForm
from .models import Person


class DepositForm(forms.Form):
    deposit_amount = forms.IntegerField(label='kr',
                                        widget=forms.NumberInput(attrs={'class': 'form-control',
                                                                        'placeholder': 'kr.'}))


class AddPersonForm(ModelForm):
    class Meta:
        model = Person
        fields = ['name', 'balance']
