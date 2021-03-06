# Generated by Django 3.0.4 on 2020-05-04 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0030_auto_20200502_2241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ost',
            name='animation',
            field=models.ManyToManyField(blank=True, null=True, to='ost.Animation'),
        ),
        migrations.AlterField(
            model_name='ost',
            name='games',
            field=models.ManyToManyField(blank=True, null=True, to='ost.Game'),
        ),
        migrations.AlterField(
            model_name='ost',
            name='platform',
            field=models.ManyToManyField(blank=True, null=True, to='ost.Platform'),
        ),
        migrations.AlterField(
            model_name='ost',
            name='releated_ost',
            field=models.ManyToManyField(blank=True, null=True, to='ost.Ost'),
        ),
        migrations.AlterField(
            model_name='ost',
            name='type',
            field=models.ManyToManyField(blank=True, null=True, to='ost.Type'),
        ),
    ]
