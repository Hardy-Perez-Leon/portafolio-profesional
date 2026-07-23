// =====================================
// Scroll suave del menú
// =====================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// =====================================
// Menú activo
// =====================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar .nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (pageYOffset >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// =====================================
// Navbar transparente
// =====================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("navbar-scroll");
  } else {
    navbar.classList.remove("navbar-scroll");
  }
});

// =====================================
// Animación al aparecer
// =====================================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },

  {
    threshold: 0.15,
  },
);

document
  .querySelectorAll(
    ".estadistica-card,.experiencia-card,.proyecto-card,.contacto-card,.cv-card,.tecnologias span",
  )
  .forEach((el) => {
    el.classList.add("hidden");

    observer.observe(el);
  });
