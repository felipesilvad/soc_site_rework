# Generated by Django 3.0.4 on 2020-05-03 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0029_auto_20200502_2127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ost',
            name='platform',
            field=models.ManyToManyField(blank=True, to='ost.Platform'),
        ),
    ]