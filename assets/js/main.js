(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;

    if (all) {
      selectEl.forEach((node) => node.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  };

  const showSection = (hash) => {
    const header = select("#header");
    const sections = select("section", true);

    if (hash === "#header") {
      header.classList.remove("header-top");
      sections.forEach((item) => item.classList.remove("section-show"));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = select(hash);
    if (!section) return;

    const reveal = () => {
      sections.forEach((item) => item.classList.remove("section-show"));
      section.classList.add("section-show");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!header.classList.contains("header-top")) {
      header.classList.add("header-top");
      setTimeout(reveal, 280);
      return;
    }

    reveal();
  };

  const setActiveNav = (hash) => {
    select("#navbar .nav-link", true).forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === hash);
    });
  };

  const closeMobileNav = () => {
    const navbar = select("#navbar");
    const toggle = select(".mobile-nav-toggle");

    if (navbar && navbar.classList.contains("navbar-mobile")) {
      navbar.classList.remove("navbar-mobile");
      if (toggle) {
        toggle.classList.remove("bi-x");
        toggle.classList.add("bi-list");
      }
    }
  };

  on("click", ".mobile-nav-toggle", function() {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on("click", "a.nav-link[href^='#']", function(e) {
    const hash = this.getAttribute("href");
    const section = select(hash);

    if (!section && hash !== "#header") return;

    e.preventDefault();
    setActiveNav(hash);
    closeMobileNav();
    showSection(hash);
  }, true);

  window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (!hash) return;

    const section = select(hash);
    if (!section && hash !== "#header") return;

    setActiveNav(hash);
    showSection(hash);
  });

  const portfolioItems = select("#projets .portfolio-item", true);
  const portfolioFilters = select("#portfolio-flters li", true);

  if (portfolioFilters.length && portfolioItems.length) {
    on("click", "#portfolio-flters li", function(e) {
      e.preventDefault();
      portfolioFilters.forEach((el) => el.classList.remove("filter-active"));
      this.classList.add("filter-active");

      const filter = this.getAttribute("data-filter");
      portfolioItems.forEach((item) => {
        item.classList.toggle("is-hidden", filter !== "*" && !item.matches(filter));
      });
    }, true);
  }

  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".portfolio-lightbox" });
  }
})();
