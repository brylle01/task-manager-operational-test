from django.db import models

# Create your models here.

class Task(models.Model):
  title = models.CharField(max_length=200)
  description = models.TextField(blank=True, null=True)
  completed = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ['completed', '-created_at']

  def __str__(self):
    return self.title
