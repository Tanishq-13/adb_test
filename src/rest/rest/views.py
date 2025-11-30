from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from pymongo import MongoClient
from bson.objectid import ObjectId

#  MongoDB Connection

mongo_uri = f"mongodb://{os.environ['MONGO_HOST']}:{os.environ['MONGO_PORT']}"
db = MongoClient(mongo_uri)['test_db']
todos_collection = db.todos


#  Helper Functions

def serialize_todo(todo):
    """Convert MongoDB ObjectId to string."""
    return {
        "_id": str(todo["_id"]),
        "description": todo["description"]
    }


def fetch_all_todos():
    """Fetch all todos from MongoDB."""
    todos = list(todos_collection.find({}, {"description": 1}))
    return [serialize_todo(t) for t in todos]


def insert_todo(description):
    """Insert a todo and return serialized result."""
    result = todos_collection.insert_one({"description": description})
    return {"_id": str(result.inserted_id), "description": description}


#  API View

class TodoListView(APIView):

    def get(self, request):
        try:
            todos = fetch_all_todos()
            return Response(todos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        description = request.data.get("description", "").strip()

        if not description:
            return Response(
                {"error": "Description is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            todo = insert_todo(description)
            return Response(todo, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"error": "Database error: " + str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
