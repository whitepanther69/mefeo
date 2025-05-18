document.addEventListener("DOMContentLoaded", () => {
  // NAV TOGGLE
  const hamburger = document.getElementById("hamburger");
  const navLinksList = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinksList.classList.toggle("show");
  });

  // VIDEO ROTATION
  const video = document.getElementById("bgVideo");
  const sources = [
    "assets/video/entry.mp4",
    "assets/video/video1.mp4",
    "assets/video/video2.mp4",
    "assets/video/video3.mp4",
    "assets/video/video4.mp4",
    "assets/video/video5.mp4"
  ];
  let index = 0;

  function playNextVideo() {
    video.src = sources[index];
    video.play();
    index = (index + 1) % sources.length;
  }

  if (video) {
    video.addEventListener("ended", playNextVideo);
    playNextVideo();
  }

  // THANK-YOU MESSAGE
  const thankText = document.getElementById("thankText");
  if (thankText) {
    thankText.classList.add("animate-in");
  }

  // ========== ACTIVE CLASS ON CLICK ==========
  const allActiveTargets = document.querySelectorAll(".btn, .btn-home, .nav-links li a");

  allActiveTargets.forEach(el => {
    el.addEventListener("click", function (e) {
      // Prevent scrolling immediately on internal anchors
      if (this.tagName === "A" && this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Remove active from all
      allActiveTargets.forEach(item => item.classList.remove("active"));

      // Add active to the clicked one
      this.classList.add("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const allClickable = document.querySelectorAll(".btn, .btn-home, .nav-links li a");

  allClickable.forEach(el => {
    el.addEventListener("click", function (e) {
      // Remove active class from all
      allClickable.forEach(btn => btn.classList.remove("active"));

      // Add to the clicked element
      this.classList.add("active");

      // Optional: smooth scroll if it's an anchor link
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});
