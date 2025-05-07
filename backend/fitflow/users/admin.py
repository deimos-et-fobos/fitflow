from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

CustomUser = get_user_model()


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('__str__', 'name', 'is_active')
    search_fields = ('email', 'name')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {
            'fields': ('name', 'age', 'sex', 'height_cm', 'weight_kg', 'activity_level', 'dietary_restrictions', 'goal')
        }),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'age', 'sex', 'height_cm', 'weight_kg', 'activity_level', 'dietary_restrictions', 'goal', 'accept_terms'),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)
