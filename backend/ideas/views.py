from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Idea
from .serializers import IdeaSerializer, IdeaReviewSerializer
from users.permissions import IsEmployee,IsManager, IsAdmin, IsManagerOrAdmin
from rest_framework.views import APIView
from rest_framework.response import Response 


class IdeaListCreateView(generics.ListCreateAPIView):

    serializer_class = IdeaSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return[IsEmployee()]

        return [IsAuthenticated()]
    

    def get_queryset(self):
        return Idea.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class IdeaReviewView(generics.UpdateAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaReviewSerializer
    permission_classes = [IsManagerOrAdmin]


class IdeaDeleteView(generics.DestroyAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [IsAdmin]


class IdeaUpdateView(generics.UpdateAPIView):
    serializer_class = IdeaSerializer
    permission_classes = [IsEmployee]

    def get_queryset(self):
        return Idea.objects.filter(created_by=self.request.user)    


class IdeaDetailView(generics.RetrieveAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    pagination_class = [IsAuthenticated]



class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        recent_ideas = Idea.objects.order_by('-created_at')[:5]

        return Response({
            "total_ideas": Idea.objects.count(),
            "approved": Idea.objects.filter(status = 'approved').count(),
            "pending": Idea.objects.filter(status__in = ['submitted', 'under_review']).count(),
            "rejected": Idea.objects.filter(status = 'rejected').count(),

            "recent_ideas" : [
                {
                    "id": idea.id,
                    "title": idea.title,
                    "category": idea.category,
                    "status": idea.status,
                    "created_by": idea.created_by.username,
                    "created_at": idea.created_at,
                }
                for idea in recent_ideas
            ]
        })    