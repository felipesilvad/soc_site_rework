# Generated by Django 3.0.4 on 2020-04-24 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0021_auto_20200422_2335'),
    ]

    operations = [
        migrations.AddField(
            model_name='ost',
            name='download_link_1',
            field=models.CharField(choices=[('MG', 'MEGA'), ('MF', 'MediaFire'), ('GD', 'Google Drive'), ('BD', 'BeDrive'), ('MI', 'Mirror')], default='MEDIAFIRE', max_length=2),
        ),
        migrations.AlterField(
            model_name='ost',
            name='amazon_html',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='ost',
            name='other_link_site_1',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='ost',
            name='other_link_site_2',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]