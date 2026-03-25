from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from django.shortcuts import get_object_or_404

class TaskViewSet(viewsets.ViewSet):

  # GET /tasks/
  def list(self, response): 
    queryset = Task.objects.all()
    serializer = TaskSerializer(queryset, many=True)
    return Response(serializer.data)
  
  # POST /tasks/
  def create(self, request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  # GET /tasks/{id}/
  def retrieve(self, request, pk=None):
    task = get_object_or_404(Task, pk=pk)
    serializer = TaskSerializer(task)
    return Response(serializer.data)
  
  # PUT /tasks/{id}/
  def update(self, request, pk=None):
    task = get_object_or_404(Task, pk=pk)
    serializer = TaskSerializer(task, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
  
  # PATCH /tasks/{id}/
  def partial_update(self, request, pk=None):
    task = get_object_or_404(Task, pk=pk)
    task.completed = not task.completed
    task.save()
    serializer = TaskSerializer(task)
    return Response(serializer.data)
  
  # DELETE /tasks/{id}/
  def destroy(self, request, pk=None):
    task = get_object_or_404(Task, pk=pk)
    task.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



