from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password

class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, password,role,student_class,teacher_class, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not role:
            raise ValueError('Select one role')          

        email = self.normalize_email(email)
        user = self.model(email=email,student_class=student_class,teacher_class=teacher_class, **extra_fields)
        user.set_password((password))
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_active',True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Super user must have is_staff true")

        return self.create_user(email, password, **extra_fields)        