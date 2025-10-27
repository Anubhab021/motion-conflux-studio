/* js/theme.js
   Toggle site theme by switching data-theme on .site-wrapper and persist selection.
   Updates aria-pressed on #themeToggle and swaps Font Awesome icon classes.
*/
(function () {
  const STORAGE_KEY = "mc_theme";
  const wrapper = document.documentElement;
  const btn = document.getElementById("theme-toggle");

  if (!btn || !wrapper) return;

  function applyTheme(theme) {
    // Accepts 'dark' or 'light'
    wrapper.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");

    // Update inner icon (assumes <i> inside button)
    const icon = btn.querySelector("i");
    if (icon) {
      if (theme === "light") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    }
  }

  function toggleTheme() {
    const current =
      wrapper.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  }

  // Initialize from localStorage or existing attribute
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") applyTheme(stored);
  else {
    // If wrapper already has data-theme, respect it; otherwise default to dark
    const existing = wrapper.getAttribute("data-theme");
    applyTheme(existing === "light" ? "light" : "dark");
  }

  // Click handler
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTheme();
  });

  // Keyboard access: Enter/Space on button already works because it's a button.

  // Expose
  window.mcTheme = {
    applyTheme,
    toggleTheme,
  };
})();
