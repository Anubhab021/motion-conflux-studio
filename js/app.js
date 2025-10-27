/* js/app.js
   App initializer: carousel, dropdown accessibility, lightbox double-click, wiring other modules.
*/
(function () {
  // Wait for DOM
  document.addEventListener("DOMContentLoaded", () => {
    // Init modules if present
    // (sidebar, theme, search, player are self-initializing in their files)
    initDropdowns();
    initCarousel();
    initCardLightbox();
    initRowControls();
    initHeaderSearchFocus();
    initLazyMedia();
    initCategoryChips();
  });

  /* -----------------------
     Dropdowns (sidebar) accessibility
     ----------------------- */
  function initDropdowns() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;
    const toggles = sidebar.querySelectorAll(
      'button.submenu-toggle, button.dropdown-btn, button[aria-haspopup="true"]'
    );

    toggles.forEach((btn) => {
      // Ensure aria-expanded exists
      if (!btn.hasAttribute("aria-expanded"))
        btn.setAttribute("aria-expanded", "false");

      btn.addEventListener("click", (e) => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      });

      // Toggle on Enter/Space (button element naturally supports this)
      // Also open on hover for non-touch devices (progressive enhancement)
      let hoverTimer = null;
      btn.addEventListener("mouseenter", () => {
        if (window.matchMedia("(hover: hover)").matches) {
          clearTimeout(hoverTimer);
          btn.setAttribute("aria-expanded", "true");
        }
      });
      btn.addEventListener("mouseleave", () => {
        if (window.matchMedia("(hover: hover)").matches) {
          hoverTimer = setTimeout(
            () => btn.setAttribute("aria-expanded", "false"),
            300
          );
        }
      });
    });
  }

  /* -----------------------
     Row controls for horizontal scrolling lists (scroll-snap)
     ----------------------- */
  function initRowControls() {
    const rows = document.querySelectorAll(".trending-row, .featured-grid");
    rows.forEach((row) => {
      // only add controls if overflow available
      if (row.scrollWidth <= row.clientWidth) return;
      const wrapper = document.createElement("div");
      wrapper.className = "row-with-controls";
      row.parentNode.insertBefore(wrapper, row);
      wrapper.appendChild(row);
      const left = document.createElement("button");
      left.className = "row-arrow row-arrow-left icon-btn";
      left.setAttribute("aria-label", "Scroll left");
      left.innerHTML = '<i class="fas fa-chevron-left"></i>';
      const right = document.createElement("button");
      right.className = "row-arrow row-arrow-right icon-btn";
      right.setAttribute("aria-label", "Scroll right");
      right.innerHTML = '<i class="fas fa-chevron-right"></i>';
      wrapper.appendChild(left);
      wrapper.appendChild(right);

      const scrollBy = Math.round(row.clientWidth * 0.8);
      left.addEventListener("click", () => {
        row.scrollBy({ left: -scrollBy, behavior: "smooth" });
      });
      right.addEventListener("click", () => {
        row.scrollBy({ left: scrollBy, behavior: "smooth" });
      });
    });
  }

  /* -----------------------
     Hero Carousel
     ----------------------- */
  function initCarousel() {
    const carousel = document.getElementById("heroCarousel");
    if (!carousel) return;

    const track = carousel.querySelector(".carousel-track") || null;
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    const indicatorsContainer = carousel.querySelector(".carousel-indicators");

    let current = 0;
    let timer = null;
    const INTERVAL = 6000;
    const total = slides.length || 0;

    function goTo(index) {
      if (!track) return;
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      const translate = -index * 100;
      track.style.transform = `translateX(${translate}%)`;
      updateIndicators();
      // Let player handle video start/stop
      const activeSlide = slides[current];
      if (
        window.mcPlayer &&
        typeof window.mcPlayer.onSlideChange === "function"
      ) {
        window.mcPlayer.onSlideChange(activeSlide);
      }
    }

    function next() {
      goTo(current + 1);
    }
    function prev() {
      goTo(current - 1);
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(() => next(), INTERVAL);
    }
    function stopAuto() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function updateIndicators() {
      if (!indicatorsContainer) return;
      const dots = Array.from(indicatorsContainer.querySelectorAll("button"));
      dots.forEach((d, i) => {
        d.setAttribute("aria-pressed", i === current ? "true" : "false");
      });
    }

    // Build indicators if not present
    if (!indicatorsContainer) {
      const wrapper = document.createElement("div");
      wrapper.className = "carousel-indicators";
      slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", `Go to slide ${i + 1}`);
        b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
        b.addEventListener("click", () => {
          goTo(i);
          startAuto();
        });
        wrapper.appendChild(b);
      });
      carousel.appendChild(wrapper);
    }

    // Attach controls
    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        prev();
        startAuto();
      });
    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        next();
        startAuto();
      });

    // Pause on hover/focus
    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);
    carousel.addEventListener("focusin", stopAuto);
    carousel.addEventListener("focusout", startAuto);

    // Make slides keyboard accessible (left/right)
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });

    // Initialize first slide and autoplay
    goTo(0);
    startAuto();

    // Expose simple API
    window.mcCarousel = { goTo, next, prev, startAuto, stopAuto };
  }

  /* -----------------------
     Double-click lightbox for .card
     ----------------------- */
  function initCardLightbox() {
    // Create modal container (use computed theme vars for inline fallbacks)
    const panelBg =
      getComputedStyle(document.documentElement).getPropertyValue("--panel") ||
      "#071920";
    const textColor =
      getComputedStyle(document.documentElement).getPropertyValue("--text") ||
      "#e6f0f2";
    const modalHtml = `
      <div id="mc-lightbox" class="mc-lightbox" role="dialog" aria-modal="true" aria-hidden="true" style="display:none;position:fixed;inset:0;z-index:2000;align-items:center;justify-content:center;background:${panelBg};">
        <div class="mc-lightbox-inner" style="max-width:90%;max-height:90%;position:relative;">
          <button id="mc-lightbox-close" aria-label="Close" style="position:absolute;right:8px;top:8px;z-index:10;background:transparent;border:none;color:${textColor};font-size:28px;">&times;</button>
          <div id="mc-lightbox-media" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"></div>
        </div>
      </div>
    `;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = modalHtml;
    document.body.appendChild(wrapper.firstElementChild);

    const lightbox = document.getElementById("mc-lightbox");
    const mediaContainer = document.getElementById("mc-lightbox-media");
    const closeBtn = document.getElementById("mc-lightbox-close");

    function openLightboxForCard(card) {
      if (!card) return;
      const previouslyFocused = document.activeElement;
      const img = card.querySelector("img");
      const video = card.querySelector("video");
      mediaContainer.innerHTML = ""; // clear
      if (video) {
        // clone and play
        const clone = video.cloneNode(true);
        // if sources are data-src we attempt to copy src into source
        clone.removeAttribute("id");
        clone.controls = true;
        clone.muted = false;
        clone.autoplay = true;
        clone.style.maxWidth = "100%";
        clone.style.maxHeight = "100%";
        mediaContainer.appendChild(clone);
        // Ensure sources are loaded
        const sources = clone.querySelectorAll("source");
        sources.forEach((s) => {
          if (!s.src && s.getAttribute("data-src"))
            s.src = s.getAttribute("data-src");
        });
        try {
          clone.play().catch(() => {});
        } catch (e) {}
      } else if (img) {
        const cloneImg = document.createElement("img");
        cloneImg.src = img.src || img.getAttribute("data-src") || "";
        cloneImg.alt = img.alt || "";
        cloneImg.style.maxWidth = "100%";
        cloneImg.style.maxHeight = "100%";
        mediaContainer.appendChild(cloneImg);
      } else {
        // fallback: try data-full attribute
        const full = card.getAttribute("data-full");
        if (full) {
          const fimg = document.createElement("img");
          fimg.src = full;
          fimg.style.maxWidth = "100%";
          fimg.style.maxHeight = "100%";
          mediaContainer.appendChild(fimg);
        } else {
          mediaContainer.textContent = "No preview available";
        }
      }

      lightbox.style.display = "flex";
      lightbox.setAttribute("aria-hidden", "false");
      // trap focus on lightbox
      const focusable =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusableEls = Array.from(lightbox.querySelectorAll(focusable));
      const firstFocusable = closeBtn || focusableEls[0];
      const lastFocusable = focusableEls[focusableEls.length - 1] || closeBtn;
      firstFocusable && firstFocusable.focus();
      document.body.style.overflow = "hidden";

      // Key handler for focus trap
      function trap(e) {
        if (e.key === "Tab") {
          if (focusableEls.length === 0) {
            e.preventDefault();
            return;
          }
          const idx = focusableEls.indexOf(document.activeElement);
          if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
        if (e.key === "Escape") {
          closeLightbox();
        }
      }
      document.addEventListener("keydown", trap);
      // store for close to remove
      lightbox._trapHandler = trap;
      lightbox._previousFocus = previouslyFocused;
    }

    // expose openLightboxForCard for other modules
    window.mcApp = window.mcApp || {};
    window.mcApp.openLightboxForCard = openLightboxForCard;

    function closeLightbox() {
      // pause any media inside
      const vid = mediaContainer.querySelector("video");
      if (vid && !vid.paused)
        try {
          vid.pause();
        } catch (e) {}
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      // restore focus
      try {
        const prev = lightbox._previousFocus;
        if (prev && typeof prev.focus === "function") prev.focus();
      } catch (e) {}
      // remove trap
      if (lightbox._trapHandler)
        document.removeEventListener("keydown", lightbox._trapHandler);
    }

    // Attach double-click and click on 'View' icons or cards
    document.addEventListener("dblclick", (e) => {
      const card = e.target.closest(".card");
      if (card) openLightboxForCard(card);
    });
    document.addEventListener("click", (e) => {
      const viewBtn = e.target.closest('.icon[aria-label="View"]');
      if (viewBtn) {
        const card = viewBtn.closest(".card");
        if (card) {
          e.preventDefault();
          openLightboxForCard(card);
        }
      }
    });

    // Close handlers
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* -----------------------
     Accessibility: focus on search when mobile search icon clicked (if any)
     ----------------------- */
  function initHeaderSearchFocus() {
    const searchForm = document.getElementById("site-search");
    const searchToggle = document.querySelector(".mobile-search-toggle");
    if (searchToggle && searchForm) {
      searchToggle.addEventListener("click", () => {
        const input = searchForm.querySelector('input[name="q"]');
        if (input) input.focus();
      });
    }
  }

  // Expose app-level API if needed
  window.mcApp = window.mcApp || {};
  window.mcApp.initDropdowns = initDropdowns;
  window.mcApp.initCarousel = initCarousel;
  window.mcApp.initLazyMedia = initLazyMedia;
  window.mcApp.initCategoryChips = initCategoryChips;
  // openLightbox will be attached inside initCardLightbox when available
})();
/* -----------------------
   Lazy load images/videos with IntersectionObserver
   ----------------------- */
(function(){
  function initLazyMedia(){
    const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const el = entry.target;
        if(el.tagName === 'IMG'){
          const ds = el.getAttribute('data-src');
          if(ds){ el.src = ds; }
        }
        if(el.tagName === 'VIDEO'){
          if(window.mcPlayer){ window.mcPlayer.lazyLoadVideo(el); }
        }
        obs.unobserve(el);
      });
    }, {rootMargin: '200px'}): null;

    const lazyImgs = document.querySelectorAll('img[data-src]');
    const lazyVids = document.querySelectorAll('video[data-src]');
    lazyImgs.forEach(img=>{ io ? io.observe(img) : (img.src = img.getAttribute('data-src')); });
    lazyVids.forEach(v=>{ if(io) io.observe(v); else if(window.mcPlayer) window.mcPlayer.lazyLoadVideo(v); });
  }

  function initCategoryChips(){
    const chips = document.querySelector('.category-chips');
    if(!chips) return;
    let lastY = window.scrollY;
    function onScroll(){
      const y = window.scrollY;
      if(y < 80){ chips.classList.remove('visible'); return; }
      if(y < lastY) chips.classList.add('visible'); else chips.classList.remove('visible');
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    chips.addEventListener('click', (e)=>{
      const btn = e.target.closest('[data-jump]');
      if(!btn) return;
      const id = btn.getAttribute('data-jump');
      const target = document.getElementById(id);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }

  window.initLazyMedia = initLazyMedia;
  window.initCategoryChips = initCategoryChips;
})();
