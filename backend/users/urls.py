from django.urls import path
from .views import SignupView, ProfileView, AdminOnlyView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('admin-only/', AdminOnlyView.as_view(), name='admin-only')
]