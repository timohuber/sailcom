from django.contrib.auth import get_user_model
from django.db import models
User = get_user_model()


class Registration(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    code = models.CharField(max_length=20)
    code_used = models.BooleanField(default=False)

    user = models.OneToOneField(to=User, related_name='registration',
                                on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'id: {self.id}, email: {self.user.email}, used: {self.code_used}'
