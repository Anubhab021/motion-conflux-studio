/* js/sidebar.js
   Handles sidebar collapse/expand and dropdown behavior with mobile support
*/
(function () {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggle-btn");

  function toggleSidebar() {
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
    closeAllSubMenus();

    // Save state
    try {
      localStorage.setItem(
        "mc_sidebar_state",
        sidebar.classList.contains("close") ? "closed" : "open"
      );
    } catch (e) {
      console.warn("Could not save sidebar state:", e);
    }
  }

  function toggleSubMenu(button) {
    // If clicking a new submenu, close others first
    if (!button.nextElementSibling.classList.contains("show")) {
      closeAllSubMenus();
    }

    button.nextElementSibling.classList.toggle("show");
    button.classList.toggle("rotate");

    // If sidebar is closed, open it
    if (sidebar.classList.contains("close")) {
      sidebar.classList.remove("close");
      toggleButton.classList.remove("rotate");
    }
  }

  function closeAllSubMenus() {
    const openMenus = sidebar.getElementsByClassName("show");
    Array.from(openMenus).forEach((ul) => {
      ul.classList.remove("show");
      ul.previousElementSibling.classList.remove("rotate");
    });
  }

  // Initialize from storage
  function initSidebar() {
    try {
      const state = localStorage.getItem("mc_sidebar_state");
      if (state === "closed") {
        sidebar.classList.add("close");
        toggleButton.classList.add("rotate");
      }
    } catch (e) {
      console.warn("Could not restore sidebar state:", e);
    }
  }

  // Click outside to close submenus
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target)) {
      closeAllSubMenus();
    }
  });

  // Expose functions for HTML onclick handlers
  window.toggleSidebar = toggleSidebar;
  window.toggleSubMenu = toggleSubMenu;
  window.closeAllSubMenus = closeAllSubMenus;

  // Initialize
  initSidebar();

  // Respect prefers-reduced-motion
  try {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setMotion = () => {
      const noTransition = mq.matches;
      sidebar.style.transition = noTransition
        ? "none"
        : "width var(--duration, 280ms) var(--ease, ease)";
    };
    setMotion();
    mq.addEventListener("change", setMotion);
  } catch (_) {}

  // Search and theme buttons
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      // Will be implemented in search.js
      window.dispatchEvent(new CustomEvent("toggleSearch"));
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const icon = themeBtn.querySelector("i");
      const isDark = wrapper.getAttribute("data-theme") === "dark";
      wrapper.setAttribute("data-theme", isDark ? "light" : "dark");
      if (icon) {
        icon.className = isDark
          ? "fas fa-sun nav-icon"
          : "fas fa-moon nav-icon";
      }
      try {
        localStorage.setItem("mc_theme", isDark ? "light" : "dark");
      } catch (e) {
        console.warn("Could not save theme preference:", e);
      }
    });
  }

  // Minimal API
  window.mcSidebar = {
    toggle: toggleSidebar,
    isCollapsed: () => sidebar.classList.contains("close"),
  };
})();
 
