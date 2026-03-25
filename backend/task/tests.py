from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Task

class TaskAPITest(TestCase):

  def setUp(self):
      self.client = APIClient()
      self.task   = Task.objects.create(
          title       = 'Test Task',
          description = 'Test Description',
          completed   = False
      )

  # GET /api/tasks/
  def test_list_tasks(self):
      response = self.client.get('/api/tasks/')
      self.assertEqual(response.status_code, status.HTTP_200_OK)
      self.assertEqual(len(response.data), 1)

  # POST /api/tasks/
  def test_create_task(self):
      data     = {'title': 'New Task', 'completed': False}
      response = self.client.post('/api/tasks/', data, format='json')
      self.assertEqual(response.status_code, status.HTTP_201_CREATED)
      self.assertEqual(Task.objects.count(), 2)
      self.assertEqual(response.data['title'], 'New Task')

  # POST with missing title
  def test_create_task_invalid(self):
      data     = {'title': ''}  # empty title
      response = self.client.post('/api/tasks/', data, format='json')
      self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

  # GET /api/tasks/{id}/
  def test_retrieve_task(self):
      response = self.client.get(f'/api/tasks/{self.task.id}/')
      self.assertEqual(response.status_code, status.HTTP_200_OK)
      self.assertEqual(response.data['title'], 'Test Task')

  # GET non-existent task
  def test_retrieve_task_not_found(self):
      response = self.client.get('/api/tasks/999/')
      self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

  # PUT /api/tasks/{id}/
  def test_update_task(self):
      data     = {'title': 'Updated Task', 'completed': True}
      response = self.client.put(f'/api/tasks/{self.task.id}/', data, format='json')
      self.assertEqual(response.status_code, status.HTTP_200_OK)
      self.assertEqual(response.data['title'], 'Updated Task')
      self.assertTrue(response.data['completed'])

  # PATCH /api/tasks/{id}/
  def test_partial_update_task(self):
      data     = {'completed': True}  # only update completed
      response = self.client.patch(f'/api/tasks/{self.task.id}/', data, format='json')
      self.assertEqual(response.status_code, status.HTTP_200_OK)
      self.assertTrue(response.data['completed'])

  # DELETE /api/tasks/{id}/
  def test_delete_task(self):
      response = self.client.delete(f'/api/tasks/{self.task.id}/')
      self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
      self.assertEqual(Task.objects.count(), 0)

  # DELETE non-existent task
  def test_delete_task_not_found(self):
      response = self.client.delete('/api/tasks/999/')
      self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)