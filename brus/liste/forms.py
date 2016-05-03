from django import forms
from django.forms import ModelForm
from .models import Person


class DepositForm(forms.Form):
    deposit_amount = forms.IntegerField(label='kr', min_value=0, max_value=2000,
                                        widget=forms.NumberInput(attrs={'class': 'form-control',
                                                                        'placeholder': 'kr.'}))


class AddPersonForm(ModelForm):
    class Meta:
        model = Person
        fields = ['name', 'balance']
