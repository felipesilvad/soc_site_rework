from django import forms
from . import models
from .models import Ost, Game, Platform, Animation, Type


class AddOst(forms.ModelForm):
    class Meta:
        model = models.Ost
        fields = ['title', 'slug', 'sub_title', 'cover', 'class_game', 'class_animation', 'release_date',  
        'artists', 'label', 'other_games', 'animation', 'other_animation', 'tracklist',
        'vgmdb_link', 'amazon_html', 'amazon_link', 'amazon_jp', 'play_asia_link', 'cd_japan_link', 'spotify_link',
        'google_play', 'steam', 'mora' , 'itunes', 'ototoy', 'other_link_site_1', 'other_link_1' ,
        'other_link_site_2', 'other_link_2',
        'download_link_choices_1', 'download_link_1', 'download_link_1_soc', 'download_link_choices_2',
        'download_link_2', 'download_link_2_soc', 'download_link_choices_3', 'download_link_3',
        'download_link_3_soc', 'download_link_choices_1_flac', 'download_link_1_flac' ,
        'download_link_1_soc_flac', 'download_link_choices_2_flac', 'download_link_2_flac',
        'download_link_2_soc_flac', 'download_link_choices_3_flac', 'download_link_3_flac',
        'download_link_3_soc_flac']
    
    types = forms.ModelMultipleChoiceField(queryset=Type.objects.all())
    platforms = forms.ModelMultipleChoiceField(queryset=Platform.objects.all())
    games = forms.ModelMultipleChoiceField(queryset=Game.objects.all())
    animations = forms.ModelMultipleChoiceField(queryset=Animation.objects.all())
    releated_osts = forms.ModelMultipleChoiceField(queryset=Ost.objects.all())