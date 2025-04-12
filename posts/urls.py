from django.urls import path
from .views import (
    post_list_and_create,
    load_post_data_view,
    like_unlike_post,
    post_detail,
    post_detail_data_view,
)

app_name = 'posts'

urlpatterns = [
    path('', post_list_and_create, name='main_board'),
    path('like-unlike/', like_unlike_post, name='like-unlike'),
    path('data/<int:num_posts>/', load_post_data_view, name='posts_data'),
    path('<pk>/', post_detail, name='post_detail'),
    path('<pk>/data/', post_detail_data_view, name='post_detail_data'),
]