
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");
const year = document.getElementById("year");


// YEAR

year.textContent = new Date().getFullYear();


// SEARCH

searchForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    searchInput.focus();
    return;
  }

  const url =
    "https://www.google.com/search?q=" +
    encodeURIComponent(query);

  window.open(url, "_blank");

});


// QUICK SEARCH BUTTONS

document.querySelectorAll("[data-search]")
  .forEach(button => {

    button.addEventListener("click", () => {

      const query = button.dataset.search;

      searchInput.value = query;

      searchForm.requestSubmit();

    });

  });


// THEME

let lightMode =
  localStorage.getItem("easydeck-theme") === "light";


function updateTheme() {

  if (lightMode) {

    document.documentElement.style.setProperty(
      "--bg",
      "#f5f7fb"
    );

    document.documentElement.style.setProperty(
      "--surface",
      "#ffffff"
    );

    document.documentElement.style.setProperty(
      "--surface-2",
      "#eef1f6"
    );

    document.documentElement.style.setProperty(
      "--text",
      "#111318"
    );

    document.documentElement.style.setProperty(
      "--muted",
      "#5f6675"
    );

    themeToggle.textContent = "☀";

  } else {

    document.documentElement.style.setProperty(
      "--bg",
      "#08090d"
    );

    document.documentElement.style.setProperty(
      "--surface",
      "#11131a"
    );

    document.documentElement.style.setProperty(
      "--surface-2",
      "#181b24"
    );

    document.documentElement.style.setProperty(
      "--text",
      "#f5f7fb"
    );

    document.documentElement.style.setProperty(
      "--muted",
      "#9ba1b2"
    );

    themeToggle.textContent = "☾";
  }
}


themeToggle.addEventListener("click", () => {

  lightMode = !lightMode;

  localStorage.setItem(
    "easydeck-theme",
    lightMode ? "light" : "dark"
  );

  updateTheme();

});


updateTheme();
