from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):

    def get(self, request):
        todos = list(db.todos.find({}, {"_id": 1, "description": 1}))
        
        # Convert ObjectId to string
        for t in todos:
            t["_id"] = str(t["_id"])
        
        return Response(todos, status=status.HTTP_200_OK)
        
    def post(self, request):
        description = request.data.get("description", "").strip()

        if not description:
            return Response(
                {"error": "Description is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Insert into MongoDB
        inserted = db.todos.insert_one({"description": description})

        return Response(
            {"_id": str(inserted.inserted_id), "description": description},
            status=status.HTTP_201_CREATED
        )
