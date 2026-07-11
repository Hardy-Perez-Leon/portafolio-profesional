from django.shortcuts import render

from .models import Proyecto


def home(request):
    proyectos = Proyecto.objects.all()

    contexto = {
        "proyectos": proyectos,
    }

    return render(request, "portfolio/home.html", contexto)