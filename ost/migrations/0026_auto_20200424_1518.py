# Generated by Django 3.0.4 on 2020-04-24 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0025_auto_20200424_1336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ost',
            name='download_link_choices_1',
            field=models.CharField(choices=[('MEGA', 'MEGA'), ('MediaFire', 'MediaFire'), ('Google Drive', 'Google Drive'), ('BeDrive', 'BeDrive'), ('Mirror', 'Mirror')], default='MediaFire', max_length=20),
        ),
        migrations.AlterField(
            model_name='ost',
            name='download_link_choices_2',
            field=models.CharField(choices=[('MEGA', 'MEGA'), ('MediaFire', 'MediaFire'), ('Google Drive', 'Google Drive'), ('BeDrive', 'BeDrive'), ('Mirror', 'Mirror')], default='MEGA', max_length=20),
        ),
        migrations.AlterField(
            model_name='ost',
            name='download_link_choices_3',
            field=models.CharField(choices=[('MEGA', 'MEGA'), ('MediaFire', 'MediaFire'), ('Google Drive', 'Google Drive'), ('BeDrive', 'BeDrive'), ('Mirror', 'Mirror')], default='Google Drive', max_length=20),
        ),
    ]