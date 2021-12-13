# Generated by Django 3.2.8 on 2021-12-12 20:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lms', '0011_assignmentgrade'),
    ]

    operations = [
        migrations.CreateModel(
            name='MeetingModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meeting_title', models.CharField(max_length=200)),
                ('meeting_url', models.URLField()),
                ('meeting_class', models.IntegerField(choices=[(1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine'), (10, 'Ten')])),
                ('teacher_created', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lms.teacher')),
            ],
        ),
    ]
