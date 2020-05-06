# Generated by Django 3.0.4 on 2020-04-10 15:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ost', '0007_auto_20200409_0131'),
    ]

    operations = [
        migrations.CreateModel(
            name='Animation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=2555)),
            ],
        ),
        migrations.CreateModel(
            name='Platform',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Serie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='ost',
            name='animation',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='ost',
            name='artists_or',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='ost',
            name='game',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='ost',
            name='games_or',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='ost',
            name='platform_or',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='ost',
            name='products_or',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='ost',
            name='publisher_or',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='artists',
            name='name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='ost',
            name='cover',
            field=models.ImageField(blank=True, upload_to='covers/%Y/%m/%D/'),
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('series', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ost.Serie')),
            ],
        ),
        migrations.AddField(
            model_name='ost',
            name='games',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ost.Game'),
        ),
        migrations.AddField(
            model_name='ost',
            name='platform',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ost.Platform'),
        ),
        migrations.AddField(
            model_name='ost',
            name='products',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ost.Animation'),
        ),
    ]