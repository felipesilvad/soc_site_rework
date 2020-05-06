from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from django.contrib.postgres.fields import JSONField

class Ost(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=255, unique=True, null=True)
    sub_title = models.TextField(blank=True, null=True)
    
    release_date = models.DateField(blank=True, null=True)
    class_game = models.BooleanField(default=True)
    class_animation = models.BooleanField(default=False)
    type = models.ManyToManyField("Type", blank=True, null=True)

    artists = models.TextField(blank=True, null=True)
    label = models.CharField(blank=True, null=True, max_length=100)
    platform = models.ManyToManyField("Platform", blank=True, null=True)
    games = models.ManyToManyField("Game", blank=True, null=True)
    other_games = models.CharField(blank=True, null=True, max_length=500)
    animation = models.ManyToManyField("Animation", blank=True, null=True)
    other_animation = models.CharField(blank=True, null=True, max_length=500)
    cover = models.ImageField(blank=True, upload_to="covers/%Y/%m/%D/")

    tracklist = models.TextField()

    vgmdb_link = models.URLField(blank=True, null=True)
    amazon_html = models.CharField(blank=True, null=True, max_length=1000)
    amazon_link = models.URLField(blank=True, null=True)
    amazon_jp = models.URLField(blank=True, null=True)
    play_asia_link = models.URLField(blank=True, null=True)
    cd_japan_link = models.URLField(blank=True, null=True)
    spotify_link = models.URLField(blank=True, null=True)
    google_play = models.URLField(blank=True, null=True)
    steam = models.URLField(blank=True, null=True)
    mora = models.URLField(blank=True, null=True)
    itunes = models.URLField(blank=True, null=True)
    ototoy = models.URLField(blank=True, null=True)
    other_link_site_1 = models.CharField(blank=True, max_length=100, null=True)
    other_link_1 = models.URLField(blank=True, null=True)
    other_link_site_2 = models.CharField(blank=True, max_length=100, null=True)
    other_link_2 = models.URLField(blank=True, null=True)

    MEGA = 'MEGA'
    MEDIAFIRE = 'MediaFire'
    GOOGLEDRIVE = 'Google Drive'
    BEDRIVE = 'BeDrive'
    MIRROR = 'Mirror'
    LINKS_CHOICES = [
        (MEGA, 'MEGA'),
        (MEDIAFIRE, 'MediaFire'),
        (GOOGLEDRIVE, 'Google Drive'),
        (BEDRIVE, 'BeDrive'),
        (MIRROR, 'Mirror'),
    ]
    download_link_choices_1 = models.CharField(choices=LINKS_CHOICES, max_length=20, default='MediaFire')
    download_link_1 = models.URLField(blank=True, null=True)
    download_link_1_soc = models.URLField(blank=True, null=True)
    download_link_choices_2 = models.CharField(choices=LINKS_CHOICES, max_length=20, default='MEGA')
    download_link_2 = models.URLField(blank=True, null=True)
    download_link_2_soc = models.URLField(blank=True, null=True)
    download_link_choices_3 = models.CharField(choices=LINKS_CHOICES, max_length=20, default='Google Drive')
    download_link_3 = models.URLField(blank=True, null=True)
    download_link_3_soc = models.URLField(blank=True, null=True)

    download_link_choices_1_flac = models.CharField(choices=LINKS_CHOICES, max_length=20, default='MediaFire')
    download_link_1_flac = models.URLField(blank=True, null=True)
    download_link_1_soc_flac = models.URLField(blank=True, null=True)
    download_link_choices_2_flac = models.CharField(choices=LINKS_CHOICES, max_length=20, default='MEGA')
    download_link_2_flac = models.URLField(blank=True, null=True)
    download_link_2_soc_flac = models.URLField(blank=True, null=True)
    download_link_choices_3_flac = models.CharField(choices=LINKS_CHOICES, max_length=20, default='Google Drive')
    download_link_3_flac = models.URLField(blank=True, null=True)
    download_link_3_soc_flac = models.URLField(blank=True, null=True)

    releated_ost = models.ManyToManyField("Ost", blank=True, null=True)

    date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, default=None, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
class Type(models.Model):
    type_name = models.CharField(max_length=255)

    def __str__(self):
        return self.type_name

class Platform(models.Model):
    title = models.CharField(max_length=255)
    logo = models.ImageField(blank=True, upload_to="logos/title/")
    slug = models.SlugField(max_length=255, unique=True, null=True)

    def __str__(self):
        return self.title

class Game(models.Model):
    title = models.CharField(max_length=255)
    series = models.ForeignKey("Serie", blank=True, null=True, on_delete=models.CASCADE)
    logo = models.ImageField(blank=True, upload_to="logos/title/")
    slug = models.SlugField(max_length=255, unique=True, null=True)


    def __str__(self):
        return self.title

class Serie(models.Model):
    title = models.CharField(max_length=255)
    logo = models.ImageField(blank=True, upload_to="logos/title/")
    slug = models.SlugField(max_length=255, unique=True, null=True)

    def __str__(self):
        return self.title

class Animation(models.Model):
    title = models.CharField(max_length=2555)
    image = models.ImageField(blank=True, upload_to="image/title/")
    slug = models.SlugField(max_length=255, unique=True, null=True)

    def __str__(self):
        return self.title
