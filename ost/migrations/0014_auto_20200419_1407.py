# Generated by Django 3.0.4 on 2020-04-19 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0013_auto_20200419_1407'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ost',
            name='animation',
            field=models.ManyToManyField(blank=True, to='ost.Animation'),
        ),
        migrations.AlterField(
            model_name='ost',
            name='games',
            field=models.ManyToManyField(blank=True, to='ost.Game'),
        ),
        migrations.AlterField(
            model_name='ost',
            name='platform',
            field=models.ManyToManyField(blank=True, to='ost.Platform'),
        ),
    ]
