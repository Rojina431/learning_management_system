from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password

class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, password,role, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not role:
            raise ValueError('Select one role')    

        email = self.normalize_email(email)
        print(make_password(password))
        user = self.model(email=email, **extra_fields)
        user.set_password(make_password(password))
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_active',True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Super user must have is_staff true")

        return self.create_user(email, password, **extra_fields)        