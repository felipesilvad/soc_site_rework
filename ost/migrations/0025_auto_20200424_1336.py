# Generated by Django 3.0.4 on 2020-04-24 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0024_auto_20200424_1317'),
    ]

    operations = [
        migrations.AddField(
            model_name='ost',
            name='download_link_1_soc',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='ost',
            name='download_link_2_soc',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='ost',
            name='download_link_3_soc',
            field=models.URLField(blank=True, null=True),
        ),
    ]
