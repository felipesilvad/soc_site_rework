# Generated by Django 3.0.4 on 2020-03-30 23:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ost',
            name='cover',
            field=models.ImageField(blank=True, default='default.png', upload_to=''),
        ),
    ]
