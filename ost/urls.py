from django.conf.urls import url
from django.urls import path, re_path
from . import views

app_name = 'ost'

urlpatterns = [
    path('', views.soundtrack_list, name='list'),
    path('add', views.ost_add, name='add'),
    path("<slug:slug>/", views.ost_detail, name='detail'),
    path('last-added', views.last_added, name='last_added'),
    path('games-list', views.games_list, name='games_list'),
]
