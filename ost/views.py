from django.shortcuts import render, redirect
from .models import Ost, Game, Platform, Type, Animation
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from . import forms
from django.views.generic import ListView
from django.views.generic.edit import FormMixin
from .forms import AddOst


def soundtrack_list(request):
    osts = Ost.objects.all().order_by('title')
    return render(request, 'ost/soundtrack_list.html', {'ost':osts, "title": "Soundtracks List" })

def last_added(request):
    osts = Ost.objects.all().order_by('release_date')
    return render(request, 'ost/last_added.html', {'ost':osts, "title": "Last Added" })

def ost_detail(request, slug):
    # return HttpResponse(slug)
    ost = Ost.objects.get(slug=slug)
    return render(request, 'ost/ost_detail.html', {'ost':ost})

def games_list(request):
    games = Game.objects.all().order_by('title')
    return render(request, 'ost/games_list.html', {'game':games, "title": "Games List" })

@login_required(login_url="/accounts/login")
def ost_add(request):
    platforms = Platform.objects.all()
    games = Game.objects.all()
    animations = Animation.objects.all()
    types = Type.objects.all()
    releated_osts = Ost.objects.all()
    if request.method == 'POST':
        form = forms.AddOst(request.POST, request.FILES)
        
        if form.is_valid():
            instance = form.save(commit=False)
            instance.author = request.user
            instance.save()
            instance.platform.set(form.cleaned_data['platforms'])
            instance.games.set(form.cleaned_data['games'])
            instance.animation.set(form.cleaned_data['animations'])
            instance.type.set(form.cleaned_data['types'])
            instance.releated_ost.set(form.cleaned_data['releated_osts'])
            instance.save()
            return redirect('ost:list')
    
    else:
        form = forms.AddOst()


    return render(request, 'ost/ost_add.html', {'form':form, 'platforms':platforms, 'games':games, 'animations':animations, 'types':types, 'releated_osts':releated_osts})