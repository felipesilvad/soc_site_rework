from django.http import HttpResponse
from django.shortcuts import render
from ost.models import Game, Platform

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def games_list(request):
    games = Game.objects.all().order_by('title')
    return render(request, 'games_list.html', {'game':games, "title": "Games List" })

def game_detail(request, slug):
    games = Game.objects.get(slug=slug)
    return render(request, 'game_detail.html', {'game':games})

def platforms_list(request):
    platforms = Platform.objects.all().order_by('title')
    return render(request, 'platforms_list.html', {'platform':platforms, "title": "Platforms List" })

def platform_detail(request, slug):
    platforms = Platform.objects.get(slug=slug)
    return render(request, 'platform_detail.html', {'platform':platforms})
