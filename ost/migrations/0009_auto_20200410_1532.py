# Generated by Django 3.0.4 on 2020-04-10 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0008_auto_20200410_1237'),
    ]

    operations = [
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='ost',
            name='type',
            field=models.ManyToManyField(blank=True, null=True, to='ost.Type'),
        ),
    ]