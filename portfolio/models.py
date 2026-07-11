from django.db import models


class Proyecto(models.Model):
    titulo = models.CharField(max_length=150)
    descripcion = models.TextField()
    tecnologias = models.CharField(max_length=250)
    imagen = models.ImageField(
        upload_to="proyectos/",
        blank=True,
        null=True,
    )
    enlace_github = models.URLField(blank=True)
    enlace_demo = models.URLField(blank=True)
    destacado = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-fecha_creacion"]
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"

    def __str__(self):
        return self.titulo