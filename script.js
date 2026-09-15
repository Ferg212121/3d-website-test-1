<script src="script.js"></script>
// --- Image data ---
const IMAGES = [
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png", bg: "#F4845F" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png", bg: "#6BBF7A" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png", bg: "#E882B4" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png", bg: "#6EB5FF" }
];

// --- State ---
let active = 0;
let animating = false;

// --- Elements ---
const root = document.getElementById("root");
const carousel = document.getElementById("carousel");

// --- Preload images ---
function preload() {
  IMAGES.forEach(i => {
    const img = new Image();
    img.src = i.src;
  });
}
preload();

// --- Role calculation ---
function roles(i) {
  return {
    center: i,
    left: (i + 3) % 4,
    right: (i + 1) % 4,
    back: (i + 2) % 4
  };
}

// --- Render carousel ---
function render() {
  root.style.backgroundColor = IMAGES[active].bg;
  carousel.innerHTML = "";

  const r = roles(active);
  const isMobile = window.innerWidth < 640;

  IMAGES.forEach((img, idx) => {
    const role =
      idx === r.center ? "center" :
      idx === r.left ? "left" :
      idx === r.right ? "right" : "back";

    const el = document.createElement("div");
    el.className = "carousel-item";

    const image = document.createElement("img");
    image.src = img.src;
    el.appendChild(image);

    if (role === "center") {
      el.style.left = "50%";
      el.style.bottom = isMobile ? "22%" : "0";
      el.style.height = isMobile ? "60%" : "92%";
      el.style.transform = `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`;
      el.style.filter = "blur(0px)";
      el.style.opacity = "1";
      el.style.zIndex = "20";
    } else if (role === "left") {
      el.style.left = isMobile ? "20%" : "30%";
      el.style.bottom = isMobile ? "32%" : "12%";
      el.style.height = isMobile ? "16%" : "28%";
      el.style.transform = "translateX(-50%) scale(1)";
      el.style.filter = "blur(2px)";
      el.style.opacity = "0.85";
      el.style.zIndex = "10";
    } else if (role === "right") {
      el.style.left = isMobile ? "80%" : "70%";
      el.style.bottom = isMobile ? "32%" : "12%";
      el.style.height = isMobile ? "16%" : "28%";
      el.style.transform = "translateX(-50%) scale(1)";
      el.style.filter = "blur(2px)";
      el.style.opacity = "0.85";
      el.style.zIndex = "10";
    } else {
      el.style.left = "50%";
      el.style.bottom = isMobile ? "32%" : "12%";
      el.style.height = isMobile ? "13%" : "22%";
      el.style.transform = "translateX(-50%) scale(1)";
      el.style.filter = "blur(4px)";
      el.style.opacity = "1";
      el.style.zIndex = "5";
    }

    carousel.appendChild(el);
  });
}

// --- Navigation ---
function nav(dir) {
  if (animating) return;
  animating = true;

  active = dir === "next"
    ? (active + 1) % 4
    : (active + 3) % 4;

  render();

  setTimeout(() => animating = false, 650);
}

// --- Button listeners ---
document.getElementById("next").onclick = () => nav("next");
document.getElementById("prev").onclick = () => nav("prev");

// --- Resize listener ---
window.onresize = render;

// --- Initial render ---
render();
