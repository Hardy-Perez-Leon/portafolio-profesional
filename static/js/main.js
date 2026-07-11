document.addEventListener("DOMContentLoaded", () => {
  const enlaces = document.querySelectorAll(
    ".navbar-custom .nav-link[href^='#']",
  );

  const secciones = document.querySelectorAll("section[id]");

  function cambiarEnlaceActivo(id) {
    enlaces.forEach((enlace) => {
      enlace.classList.remove("active");

      if (enlace.getAttribute("href") === `#${id}`) {
        enlace.classList.add("active");
      }
    });
  }

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", () => {
      const destino = enlace.getAttribute("href").replace("#", "");
      cambiarEnlaceActivo(destino);

      const menu = document.querySelector("#menuPrincipal");

      if (menu && menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          cambiarEnlaceActivo(entrada.target.id);
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    },
  );

  secciones.forEach((seccion) => {
    observador.observe(seccion);
  });
});
