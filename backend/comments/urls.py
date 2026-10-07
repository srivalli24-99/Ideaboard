from django.urls import path
from .views import CommentListCreateView, IdeaCommentListView, CommentUpdateView, CommentDeleteView

urlpatterns = [
    path('', CommentListCreateView.as_view(), name='comment-list-create'),
    path('idea/<int:idea_id>/', IdeaCommentListView.as_view(), name='idea-comments'),
    path('<int:pk>/update/', CommentUpdateView.as_view(), name='comment-update'),
    path('<int:pk>/delete/', CommentDeleteView.as_view(), name='comment-delete'),
]