from django.db import models

class Boat(models.Model):
    from_date_time = models.DateTimeField()

    def __str__(self):
        return self.title
