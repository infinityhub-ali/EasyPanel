/* =========================================
   EasyPanel V1 — JavaScript
   ========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  const searchForm = $("#searchForm");
  const searchInput = $("#searchInput");
  const themeToggle = $("#themeToggle");
  const assistantSearch = $("#assistantSearch");
  const backTop = $("#backTop");
  const toast = $("#toast");
  const year = $("#year");

  // Footer year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Toast notification
  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // Search the web using Google
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const query = searchInput.value.trim();

      if (!query) {
        searchInput.focus();
        showToast("Type something to search.");
        return;
      }

      const searchURL =
        "https://www.google.com/search?q=" +
        encodeURIComponent(query);

      window.open(searchURL, "_blank", "noopener,noreferrer");
    });
  }

  // Quick-search suggestions
  document.querySelectorAll("[data-search]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!searchInput) return;

      searchInput.value = button.dataset.search || "";
      searchInput.focus();

      searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  });

  // Theme toggle with saved preference
  function applyTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-mode", isLight);

    if (themeToggle) {
      themeToggle.textContent = isLight ? "☾" : "☼";
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
      themeToggle.title = isLight
        ? "Switch to dark theme"
        : "Switch to light theme";
    }
  }

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("easypanel-theme") || "dark";
  } catch (error) {
    // The site still works if browser storage is unavailable.
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("light-mode")
        ? "dark"
        : "light";

      applyTheme(nextTheme);

      try {
        localStorage.setItem("easypanel-theme", nextTheme);
      } catch (error) {
        // Theme works for the current page even without storage.
      }

      showToast(
        nextTheme === "light"
          ? "Light theme enabled."
          : "Dark theme enabled."
      );
    });
  }

  // Assistant section: focus the main search
  if (assistantSearch && searchInput) {
    assistantSearch.addEventListener("click", () => {
      searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      searchInput.focus();
      showToast("Ready when you are. Start with a search.");
    });
  }

  // Back-to-top button
  function updateBackTop() {
    if (!backTop) return;

    backTop.classList.toggle("visible", window.scrollY > 450);
  }

  window.addEventListener("scroll", updateBackTop, {
    passive: true
  });

  updateBackTop();

  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  console.log("EasyPanel V1 loaded successfully.");
});
