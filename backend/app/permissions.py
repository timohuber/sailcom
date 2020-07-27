from rest_framework.permissions import BasePermission


# General permission
class IsLoggedIn(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return False
        return bool(request.user)


class IsLoggedInOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        if request.user.is_anonymous:
            return False
        return bool(request.user)


class MemberPostLoggedInFetch(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return bool(request.user)
        return request.user.is_member


class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class IsStaffOrCrew(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or request.user.is_crew


class IsMember(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_member


# Object level permission
class IsStaffOrCreator(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.user == request.user


class IsStaffOrInstructor(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.instructor == request.user
"""
class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return obj.author == request.user


class IsReceiverOrSender(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'PATCH':
            return obj.receiver == request.user
        return obj.sender == request.user or obj.receiver == request.user


# User level permission
class UserIsCurrentUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return obj.author == request.user

class IsStaff(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return request.user.is_staff
"""
