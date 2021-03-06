import random

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import Registration
from ..mail.models import Mail
User = get_user_model()


def email_does_exist(email):
    try:
        User.objects.get(email=email)
        return email
    except User.DoesNotExist:
        raise ValidationError(message='Benutzer existiert nicht!')


def email_does_not_exist(email):
    try:
        User.objects.get(email=email)
        raise ValidationError(message='Die Email ist bereits vergeben!')
    except User.DoesNotExist:
        return email


def username_does_not_exist(username):
    try:
        User.objects.get(username=username)
        raise ValidationError(message='Der Username ist bereits vergeben!')
    except User.DoesNotExist:
        return username


def code_is_valid(code):
    try:
        reg_profile = Registration.objects.get(code=code)
        if not reg_profile.code_used:
            return code
        else:
            raise ValidationError(message='Der Code wurde schon gebraucht!')
    except Registration.DoesNotExist:
        raise ValidationError(message='Der Code ist nicht gültig!')


class CreateRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(label='Registration E-Mail Address', validators=[email_does_not_exist])

    def save(self, validated_data):
        registration_code = str(random.randint(100000, 999999))

        email = validated_data.get('email')
        new_user = User(
            username=email,
            email=email,
            is_active=False,
        )
        new_user.save()

        registration_profile = Registration(
            user=new_user,
            code=registration_code
        )
        registration_profile.save()

        email = Mail(recipient=email,
                     subject='Vielen Dank für Ihre Registrierung!',
                     content=f'Ihr Code zur Validierung: {registration_profile.code}')
        email.save()

        return new_user


class ValidateRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(label='Registration E-Mail Address', validators=[email_does_exist])
    username = serializers.CharField(label='Username', required=False)
    code = serializers.CharField(label='Validation code', write_only=True, validators=[code_is_valid])
    password = serializers.CharField(label='password', write_only=True)
    password_repeat = serializers.CharField(label='password_repeat', write_only=True)
    first_name = serializers.CharField(label='First name')
    last_name = serializers.CharField(label='Last name')

    street = serializers.CharField(required=False, label='Street')
    address_appendix = serializers.CharField(required=False, label='Address appendix')
    city = serializers.CharField(required=False, label='City')
    country = serializers.CharField(required=False, label='Country')
    zip_code = serializers.CharField(required=False, label='Zip code')
    phone = serializers.CharField(required=False, label='Phone')
    mobile = serializers.CharField(required=False, label='Mobile')
    date_of_birth = serializers.CharField(required=False, label='Date of birth')
    request_membership = serializers.BooleanField(default=False)

    licence = serializers.FileField(required=False, label='Licence')
    avatar = serializers.ImageField(required=False, label='Avatar')

    def validate(self, data):
        code = data.get('code')
        email = data.get('email')
        user = User.objects.get(email=email)
        reg_profile = Registration.objects.get(code=code)
        if reg_profile != user.registration:
            raise ValidationError(message='Dieser Code gehört nicht zu dieser Email!')
        if data.get('password') != data.get('password_repeat'):
            raise ValidationError(message='Passwörter stimmen nicht überein!')
        return data

    def save(self, validated_data):
        email = validated_data.get('email')
        user = User.objects.get(email=email)
        user.username = validated_data.get('email')
        user.first_name = validated_data.get('first_name')
        user.last_name = validated_data.get('last_name')
        user.is_active = True
        user.set_password(validated_data.get('password'))

        user.street = validated_data.get('street')
        user.address_appendix = validated_data.get('address_appendix ')
        user.city = validated_data.get('city')
        user.country = validated_data.get('country')
        user.zip_code = validated_data.get('zip_code')
        user.phone = validated_data.get('phone')
        user.mobile = validated_data.get('mobile')
        user.date_of_birth = validated_data.get('date_of_birth')

        user.licence = validated_data.get('licence')
        user.avatar = validated_data.get('avatar')
        user.request_membership = validated_data.get('request_membership')

        user.registration.code_used = True
        user.save()
        user.registration.save()
        # post_user_registration_validation.send(sender=User, user=user)
        return user
