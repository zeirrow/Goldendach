// JS Comment: Toggles the mobile navigation menu.
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    const isExpanded = this.getAttribute("aria-expanded") === "true" || false;

    menu.classList.toggle("hidden");
    this.setAttribute("aria-expanded", !isExpanded);
  });

// JS Comment: Smooth scroll for all anchor links.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Only prevent default if it's not a hash-only link intended for a framework
    if (this.getAttribute("href").length > 1) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
      // Close mobile menu after clicking a link
      if (
        !document.getElementById("mobile-menu").classList.contains("hidden")
      ) {
        document.getElementById("mobile-menu-button").click();
      }
    }
  });
});

// JS Comment: Simple client-side form validation and mailto fallback.
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const msg = document.getElementById("form-message");

    // Basic required field check
    let isValid = true;
    form.querySelectorAll("[required]").forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("ring-2", "ring-primary-red");
      } else {
        input.classList.remove("ring-2", "ring-primary-red");
      }
    });

    if (isValid) {
      // Fallback to mailto if no backend is present
      const name = form.elements["name"].value;
      const email = form.elements["email"].value;
      const phone = form.elements["phone"].value;
      const service = form.elements["service-interest"].value;
      const address = form.elements["address"].value || "N/A";
      const message = form.elements["message"].value;

      const subject = `Quote Request from ${name}`;
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AService Interest: ${service}%0D%0AAddress: ${address}%0D%0A%0D%0AMessage:%0D%0A${message}`;

      // Use the mailto protocol for simple form submission
      window.location.href = `mailto:goldendach@yahoo.com?subject=${subject}&body=${body}`;

      msg.textContent =
        "Thank you! Your request is being sent via your email client.";
      form.reset();
    } else {
      msg.textContent = "Please fill out all required fields.";
      msg.classList.add("text-primary-red");
    }
  });

// JS Comment: Accordion functionality for FAQ section.
document.querySelectorAll("#faq-accordion button").forEach((button) => {
  button.addEventListener("click", function () {
    const panelId = this.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    const icon = this.querySelector("span");

    // Close all other open panels
    document
      .querySelectorAll("#faq-accordion button")
      .forEach((otherButton) => {
        if (otherButton !== this) {
          otherButton.setAttribute("aria-expanded", "false");
          document
            .getElementById(otherButton.getAttribute("aria-controls"))
            .classList.add("hidden");
          otherButton.querySelector("span").style.transform = "rotate(0deg)";
        }
      });

    // Toggle the clicked panel
    this.setAttribute("aria-expanded", !isExpanded);
    panel.classList.toggle("hidden");
    icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
  });
});

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const galleryLinks = Array.from(document.querySelectorAll("#gallery a"));
  let currentImgIndex = 0;

  function openLightbox(index) {
    currentImgIndex = index;
    lightboxImg.src = galleryLinks[index].href;
    lightbox.classList.remove("hidden", "opacity-0");
    lightbox.classList.add("flex");
    setTimeout(() => lightbox.classList.remove("opacity-0"), 10);
    document.body.classList.add("overflow-hidden");
  }

  function closeLightbox() {
    lightbox.classList.add("opacity-0");
    setTimeout(() => {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
    }, 300);
    document.body.classList.remove("overflow-hidden");
  }

  function showNext() {
    currentImgIndex = (currentImgIndex + 1) % galleryLinks.length;
    lightboxImg.src = galleryLinks[currentImgIndex].href;
  }

  function showPrev() {
    currentImgIndex = (currentImgIndex - 1 + galleryLinks.length) % galleryLinks.length;
    lightboxImg.src = galleryLinks[currentImgIndex].href;
  }

  // Event Listeners
  galleryLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

// Close Lightbox
document
  .getElementById("lightbox-close")
  .addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target.id === "lightbox") {
    closeLightbox();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
    closeLightbox();
  }
});
function closeLightbox() {
  lightbox.classList.add("opacity-0");
  setTimeout(() => {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }, 300); // Wait for fade-out
}

// Navigation Function
function navigate(direction) {
  currentImgIndex =
    (currentImgIndex + direction + galleryLinks.length) % galleryLinks.length;
  lightboxImg.src = galleryLinks[currentImgIndex].href;
}
document
  .getElementById("lightbox-prev")
  .addEventListener("click", () => navigate(-1));
document
  .getElementById("lightbox-next")
  .addEventListener("click", () => navigate(1));

// JS Comment: Observer for subtle fade-in-up animation on scroll.
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.1, // Triggers when 10% of the item is visible
  }
);

document.querySelectorAll(".fade-in-up").forEach((element) => {
  observer.observe(element);
});
