from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):

    user = serializers.CharField(source = 'user.username', read_only = True)

    class Meta:
        model = Comment
        fields = ['id',
                  'idea',
                  'user',
                  'text',
                  'created_at'
                ]

        read_only_fields = [
            'id',
            'user',
            'created_at'
        ]