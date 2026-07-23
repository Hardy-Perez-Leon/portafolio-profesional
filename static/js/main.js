document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // Scroll suave del menú
  // =====================================

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

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

  function updateActiveMenu() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`,
      );
    });
  }

  // =====================================
  // Navbar al hacer scroll
  // =====================================

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (!navbar) {
      return;
    }

    navbar.classList.toggle("navbar-scroll", window.scrollY > 60);
  }

  window.addEventListener("scroll", () => {
    updateActiveMenu();
    updateNavbar();
  });

  updateActiveMenu();
  updateNavbar();

  // =====================================
  // Animaciones al aparecer
  // =====================================

  const animatedElements = document.querySelectorAll(
    [
      ".estadistica-card",
      ".timeline-card",
      ".tecnologia-card",
      ".proyecto-card",
      ".cv-moderno",
    ].join(","),
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("show");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
      },
    );

    animatedElements.forEach((element) => {
      element.classList.add("hidden");
      observer.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  // =====================================
  // Sección de contacto
  // =====================================

  const contactButtons = document.querySelectorAll("#contacto .contact-btn");
  const contactCard = document.getElementById("contactCard");
  const closeButton = document.getElementById("contactCardClose");

  const cardImage = document.getElementById("cardImage");
  const cardTitle = document.getElementById("cardTitle");
  const cardText = document.getElementById("cardText");
  const cardLink = document.getElementById("cardLink");
  const cardSmallIcon = document.getElementById("cardSmallIcon");

  const copyButton = document.getElementById("copyContact");
  const copyMessage = document.getElementById("copyMessage");

  let activeContactButton = null;
  let currentContactValue = "";

  function closeContactCard() {
    if (!contactCard) return;

    contactCard.hidden = true;

    contactButtons.forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-expanded", "false");
    });

    activeContactButton = null;
    currentContactValue = "";

    if (copyMessage) {
      copyMessage.textContent = "";
    }
  }

  function setSmallIcon(title) {
    if (!cardSmallIcon) return;

    const icons = {
      "Correo electrónico": "fa-regular fa-envelope",
      WhatsApp: "fa-brands fa-whatsapp",
      Ubicación: "fa-solid fa-location-dot",
      GitHub: "fa-brands fa-github",
      LinkedIn: "fa-brands fa-linkedin",
      "Currículum Vitae": "fa-solid fa-file-pdf",
    };

    cardSmallIcon.className = icons[title] || "fa-solid fa-circle-info";
  }

  function openContactCard(button) {
    if (!contactCard || !cardImage || !cardTitle || !cardText || !cardLink) {
      console.error("Faltan elementos de la tarjeta de contacto.");
      return;
    }

    const title = button.dataset.title || "";
    const image = button.dataset.image || "";
    const text = button.dataset.text || "";
    const destination = button.dataset.link || "#";
    const action = button.dataset.action || "Abrir";

    contactButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-expanded", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-expanded", "true");

    cardImage.src = image;
    cardImage.alt = title;

    cardTitle.textContent = title;
    cardText.textContent = text;

    cardLink.href = destination;
    cardLink.textContent = action;

    setSmallIcon(title);

    if (destination.startsWith("mailto:")) {
      cardLink.removeAttribute("target");
      cardLink.removeAttribute("rel");
    } else {
      cardLink.setAttribute("target", "_blank");
      cardLink.setAttribute("rel", "noopener noreferrer");
    }

    currentContactValue = text;
    activeContactButton = button;

    if (copyMessage) {
      copyMessage.textContent = "";
    }

    contactCard.hidden = false;
  }

  contactButtons.forEach((button) => {
    button.classList.remove("hidden", "show");
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const sameButtonIsOpen =
        activeContactButton === button && contactCard?.hidden === false;

      if (sameButtonIsOpen) {
        closeContactCard();
      } else {
        openContactCard(button);
      }
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeContactCard);
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      if (!currentContactValue) return;

      try {
        await navigator.clipboard.writeText(currentContactValue);

        if (copyMessage) {
          copyMessage.textContent = "✓ Información copiada";
        }
      } catch (error) {
        const temporaryInput = document.createElement("textarea");

        temporaryInput.value = currentContactValue;
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";

        document.body.appendChild(temporaryInput);
        temporaryInput.select();

        const copied = document.execCommand("copy");
        temporaryInput.remove();

        if (copyMessage) {
          copyMessage.textContent = copied
            ? "✓ Información copiada"
            : "No se pudo copiar";
        }
      }

      window.setTimeout(() => {
        if (copyMessage) {
          copyMessage.textContent = "";
        }
      }, 2200);
    });
  }
});
