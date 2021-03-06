# Generated by Django 3.0.4 on 2020-04-24 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0022_auto_20200424_0444'),
    ]

    operations = [
        migrations.AddField(
            model_name='ost',
            name='download_link_choices_1',
            field=models.CharField(choices=[('MG', 'MEGA'), ('MF', 'MediaFire'), ('GD', 'Google Drive'), ('BD', 'BeDrive'), ('MI', 'Mirror')], default='MEDIAFIRE', max_length=2),
        ),
        migrations.AlterField(
            model_name='ost',
            name='download_link_1',
            field=models.URLField(blank=True, null=True),
        ),
    ]
