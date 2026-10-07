from django.urls import path
from .views import IdeaListCreateView, IdeaReviewView, IdeaDeleteView, IdeaUpdateView, DashboardView,IdeaDetailView

urlpatterns = [
    path('', IdeaListCreateView.as_view(), name='idea-list-create'),
    path('<int:pk>/review/', IdeaReviewView.as_view(), name='idea-review'),
    path('<int:pk>/delete/', IdeaDeleteView.as_view(), name='idea-delete'),
    path('<int:pk>/edit/', IdeaUpdateView.as_view(), name='idea-edit'),
    path('dashboard/', DashboardView.as_view(), name='dashboard-view'),
    path('<int:pk>/', IdeaDetailView.as_view(), name='idea-detail'),
]