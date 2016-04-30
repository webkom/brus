from django import forms


class DepositForm(forms.Form):
    deposit_amount = forms.IntegerField(label='kr', min_value=0, max_value=2000,
                                        widget=forms.NumberInput(attrs={'class': 'form-control',
                                                                        'placeholder': 'kr.'}))


class AddNameForm(forms.Form):
    add_person = forms.CharField(label='', max_length=20,
                                 widget=forms.TextInput(attrs={'class': 'form-control',
                                                               'placeholder': 'Navn'}))
