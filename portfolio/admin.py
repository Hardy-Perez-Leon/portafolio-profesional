from django.contrib import admin

from .models import Proyecto


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = (
        "titulo",
        "tecnologias",
        "destacado",
        "fecha_creacion",
    )
    list_filter = ("destacado",)
    search_fields = ("titulo", "descripcion", "tecnologias")