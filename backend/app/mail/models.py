from django.core.mail import send_mail
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Mail(models.Model):
    recipient = models.CharField(max_length=200, blank=False)
    sender = models.CharField(max_length=200, blank=False, default='students@propulsionacademy.com')
    subject = models.CharField(max_length=200)
    content = models.CharField(max_length=2000)
    sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.recipient}: {self.subject}'


@receiver(post_save, sender=Mail)
def send_email(sender, instance, **kwargs):
    send_mail(
        instance.subject,
        instance.content,
        instance.sender,
        [instance.recipient],
        fail_silently=False,
    )
