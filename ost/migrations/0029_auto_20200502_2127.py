# Generated by Django 3.0.4 on 2020-05-03 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0028_ost_releated_ost'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ost',
            name='platform',
            field=models.ManyToManyField(blank=True, null=True, to='ost.Platform'),
        ),
    ]
