/* js/player.js
   Manage hero carousel video slides:
   - lazy-load video sources from data-src
   - play active slide video (muted, loop) and pause others
   - expose functions to play/pause current slide
*/
(function () {
  // We'll operate on videos inside #heroCarousel
  const carousel = document.getElementById("heroCarousel");
  if (!carousel) {
    window.mcPlayer = {
      playActive: () => {},
      pauseAll: () => {},
    };
    return;
  }

  function lazyLoadVideo(videoEl) {
    // videoEl: <video> element, expects data-src attribute on source or on video itself
    if (!videoEl) return;
    // If already has source children with src set, skip
    const sources = videoEl.querySelectorAll("source");
    let loaded = false;
    sources.forEach((s) => {
      if (s.src && s.src.length) loaded = true;
    });
    if (loaded) return;

    // Try to read data-src on video element or on a data-src attribute on the source elements
    // Respect network conditions and device width: avoid heavy video on slow connections or mobile
    const conn =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const effective = conn && conn.effectiveType ? conn.effectiveType : null;
    const isSlow =
      effective === "2g" || effective === "slow-2g" || effective === "slow";
    const isNarrow = window.innerWidth && window.innerWidth < 700;

    const videoSrc = videoEl.getAttribute("data-src");
    if (isSlow || isNarrow) {
      // do not auto-load large video on slow networks or narrow screens
      return;
    }

    if (videoSrc) {
      // create a source element
      const srcEl = document.createElement("source");
      srcEl.src = videoSrc;
      srcEl.type = "video/mp4";
      videoEl.appendChild(srcEl);
      // call load
      try {
        videoEl.load();
      } catch (err) {
        /* ignore */
      }
      return;
    }

    // If sources exist with data-src attributes, set them
    sources.forEach((s) => {
      const ds = s.getAttribute("data-src");
      if (ds) s.src = ds;
    });
    try {
      videoEl.load();
    } catch (err) {}
  }

  function pauseAll() {
    const videos = carousel.querySelectorAll("video");
    videos.forEach((v) => {
      try {
        v.pause();
      } catch (e) {
        /* ignore */
      }
    });
  }

  function playActive(activeSlide) {
    // activeSlide: element with class .carousel-slide
    if (!activeSlide) return;
    // Pause all first
    pauseAll();

    // If the slide contains a video, ensure it's lazy-loaded then play
    const video = activeSlide.querySelector("video");
    if (video) {
      lazyLoadVideo(video);
      // Play only when metadata is ready; use promise where available
      const attemptPlay = () => {
        video.muted = true;
        video.loop = true;
        const playPromise = video.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(() => {
            // autoplay might be blocked; that's fine
          });
        }
      };
      // Some browsers require a small timeout
      setTimeout(attemptPlay, 50);
    }
  }

  // When slide becomes inactive, pause contained videos
  function onSlideChange(activeSlide) {
    playActive(activeSlide);
  }

  // Public API
  window.mcPlayer = {
    lazyLoadVideo,
    pauseAll,
    playActive,
    onSlideChange,
  };

  // Wire global hero play/pause control if present
  try {
    const ctrl = document.getElementById("heroPlayPause");
    const vid = document.getElementById("heroVideo-1");
    if (ctrl && vid) {
      ctrl.addEventListener("click", (e) => {
        if (vid.paused) {
          vid.play().catch(() => {});
          ctrl.setAttribute("aria-label", "Pause showreel");
          ctrl.title = "Pause showreel";
          ctrl.querySelector("i")?.classList?.remove("fa-play");
          ctrl.querySelector("i")?.classList?.add("fa-pause");
        } else {
          vid.pause();
          ctrl.setAttribute("aria-label", "Play showreel");
          ctrl.title = "Play showreel";
          ctrl.querySelector("i")?.classList?.remove("fa-pause");
          ctrl.querySelector("i")?.classList?.add("fa-play");
        }
      });
    }
  } catch (e) {
    /* non-critical */
  }
})();
