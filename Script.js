// ==========================================
// EasyPanel - Fresh JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // ---------- YEAR ----------
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // ---------- SEARCH ----------
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const query = searchInput.value.trim();

      if (query !== "") {
        const url =
          "https://www.google.com/search?q=" +
          encodeURIComponent(query);

        window.open(url, "_blank");
      }
    });

  }


  // ---------- QUICK SEARCH BUTTONS ----------
  const quickButtons = document.querySelectorAll("[data-search]");

  quickButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const query = button.getAttribute("data-search");

      if (searchInput && query) {
        searchInput.value = query;
        searchInput.focus();
      }

    });

  });


  // ---------- THEME TOGGLE ----------
  const themeButton = document.getElementById("themeToggle");

  if (themeButton) {

    const savedTheme = localStorage.getItem("easypanel-theme");

    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
    }

    themeButton.addEventListener("click", () => {

      document.body.classList.toggle("light-mode");

      const isLight =
        document.body.classList.contains("light-mode");

      localStorage.setItem(
        "easypanel-theme",
        isLight ? "light" : "dark"
      );

    });

  }


  // ---------- SMOOTH SCROLL ----------
  const navigationLinks =
    document.querySelectorAll('a[href^="#"]');

  navigationLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID =
        link.getAttribute("href");

      if (
        targetID &&
        targetID !== "#"
      ) {

        const target =
          document.querySelector(targetID);

        if (target) {

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }

    });

  });


  // ---------- SIMPLE CARD ANIMATION ----------
  const cards =
    document.querySelectorAll(
      ".card, .tool-card, .feature-card, .quick-card"
    );

  cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {
      card.classList.add("card-hover");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("card-hover");
    });

  });


  // ---------- CONSOLE CHECK ----------
  console.log("EasyPanel JavaScript loaded successfully.");

});
