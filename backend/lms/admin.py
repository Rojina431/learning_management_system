from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import usermodel


class AccountAdmin(UserAdmin):
    list_display = ('email','date_joined', 'last_login', 'mobile', 'is_staff', 'role')
    search_fields = ('email',)
    readonly_fields=('date_joined', 'last_login')
    exclude = ('username',)
    fieldsets =(
        (None, {'fields': ('first_name','last_name' ,'email', 'password','mobile','role')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1','password2')},
        ),
    )
    ordering = ('email',)
    filter_horizontal = ()
    list_filter = ()

admin.site.register(usermodel.User, AccountAdmin)