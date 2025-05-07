from rest_framework import permissions

class HasAcceptedTerms(permissions.BasePermission):
    message = "Debes aceptar los términos y condiciones para continuar."
    
    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated:
            return False
        return user.accept_terms