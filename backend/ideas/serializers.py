from rest_framework import serializers
from .models import Idea

class IdeaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Idea
        fields = [
            'id',
            'title',
            'description',
            'category',
            'status',
            'created_by',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'created_by',
            'created_at',
            'updated_at'
        ]


class IdeaReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Idea
        fields = ['status']        