# Generated by Django 3.2.8 on 2021-11-13 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lms', '0002_alter_user_last_login'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
