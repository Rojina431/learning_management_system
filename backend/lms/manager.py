from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password

class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, password,role, first_name,last_name, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not role:
            raise ValueError('Select one role')
        if not first_name:
            raise ValueError('Enter first name')
        if not last_name:
            raise ValueError("Enter last name")            

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
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