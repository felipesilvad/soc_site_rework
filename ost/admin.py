from django.contrib import admin
from .models import Ost, Platform, Game, Animation, Type, Serie

class OstAdmin(admin.ModelAdmin):
    pass

class PlatformAdmin(admin.ModelAdmin):
    pass

class GameAdmin(admin.ModelAdmin):
    pass

class AnimationAdmin(admin.ModelAdmin):
    pass

class TypeAdmin(admin.ModelAdmin):
    pass

class SerieAdmin(admin.ModelAdmin):
    pass

admin.site.register(Ost, OstAdmin)
admin.site.register(Platform, PlatformAdmin)
admin.site.register(Game, GameAdmin)
admin.site.register(Animation, AnimationAdmin)
admin.site.register(Type, TypeAdmin)
admin.site.register(Serie, SerieAdmin)