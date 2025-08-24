// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  body.classList.add("dark");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.style.display = "block";
        item.style.animation = "fadeInUp 0.5s ease-out";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 100) {
    nav.style.background = body.classList.contains("dark")
      ? "rgba(37, 37, 37, 0.98)"
      : "rgba(255, 255, 255, 0.98)";
  } else {
    nav.style.background = body.classList.contains("dark")
      ? "rgba(37, 37, 37, 0.95)"
      : "rgba(255, 255, 255, 0.95)";
  }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for multiple elements
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("animate-in");
      }, index * 100);
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".skill-item, .portfolio-item, .certificate-item, .tool-badge, .contact-item"
  )
  .forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  // Add cursor
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.textContent = "|";
  cursor.style.animation = "blink 1s infinite";

  function type() {
    if (i < text.length) {
      element.innerHTML = text.substring(0, i + 1) + cursor.outerHTML;
      i++;
      setTimeout(type, speed);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        element.innerHTML = text;
      }, 1000);
    }
  }

  type();
}

// Initialize typing effect on page load
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 120);
  }
});

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-bg");
  const heroGradient = document.querySelector(".hero-gradient");
  const floatingElements = document.querySelectorAll(".floating-element");

  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }

  if (heroGradient) {
    heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
  }

  // Animate floating elements with different speeds
  floatingElements.forEach((element, index) => {
    const speed = 0.2 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Add loading progress animation
  const loadingElements = document.querySelectorAll(
    ".hero-text > *, .hero-image"
  );
  loadingElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;
    }, 500);
  });
});

const revealElements = document.querySelectorAll(
  ".section-header, .about-text, .contact-info, .about-image"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("about-image")) {
          entry.target.style.animation = "fadeInLeft 0.8s ease-out forwards";
        } else if (entry.target.classList.contains("about-text")) {
          entry.target.style.animation = "fadeInRight 0.8s ease-out forwards";
        } else {
          entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
        }
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  revealObserver.observe(el);
});

document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-10px) scale(1.05)";
    item.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)";
    item.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.08)";
  });
});

document.querySelectorAll(".tool-badge").forEach((badge, index) => {
  badge.addEventListener("mouseenter", () => {
    badge.style.transform = "translateY(-3px) scale(1.1)";
    badge.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
  });

  badge.addEventListener("mouseleave", () => {
    badge.style.transform = "translateY(0) scale(1)";
    badge.style.boxShadow = "none";
  });

  // Staggered entrance animation
  setTimeout(() => {
    badge.style.opacity = "1";
    badge.style.transform = "translateY(0)";
  }, index * 100);
});

const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
scrollProgress.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--primary));
  z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});

document.querySelectorAll(".portfolio-item").forEach((item) => {
  const overlay = item.querySelector(".portfolio-overlay");

  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-15px) scale(1.02)";
    if (overlay) {
      overlay.style.transform = "translateY(0)";
      overlay.style.opacity = "1";
    }
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)";
    if (overlay) {
      overlay.style.transform = "translateY(100%)";
      overlay.style.opacity = "0";
    }
  });
});
