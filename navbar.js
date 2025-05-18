const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const video = document.getElementById("bgVideo");
const sources = [
  "assets/video/entry.mp4",
  "assets/video/video1.mp4",
  "assets/video/video2.mp4",
  "assets/video/video3.mp4",
  "assets/video/video4.mp4"
];
let index = 0;

function playNextVideo() {
  video.src = sources[index];
  video.play();
  index = (index + 1) % sources.length;
}

video.addEventListener("ended", playNextVideo);
playNextVideo();

document.getElementById('thankText').classList.add('animate-in');
