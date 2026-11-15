// Typing effect
const text = "You've Found Your Way Into The World Of Vaigaaa";
const element = document.getElementById("typing");
let i = 0;
function type() {
  if (i < text.length) {
    element.textContent += text.charAt(i);
    i++;
    setTimeout(type, 80);
  }
}
type();

// Matrix rain
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const characters = "01ABCDEF<>{}[]/#$%&*";
const fontSize = 16;
const drops = [];
function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff41";
  ctx.font = fontSize + "px monospace";
  const columns = Math.floor(canvas.width / fontSize);
  while (drops.length < columns) drops.push(Math.random() * -50);
  for (let c = 0; c < columns; c++) {
    const ch = characters.charAt(Math.floor(Math.random() * characters.length));
    ctx.fillText(ch, c * fontSize, drops[c] * fontSize);
    if (drops[c] * fontSize > canvas.height && Math.random() > 0.975) drops[c] = 0;
    drops[c]++;
  }
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(drawMatrix, 50);
}

// Glitch headings
document.querySelectorAll("h2").forEach(function (h) {
  h.setAttribute("data-text", h.textContent);
});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function showSection() {
  let id = window.location.hash.slice(1) || "home";

  if (!document.getElementById(id)) {
    id = "home";
  }

  sections.forEach(function (section) {
    section.classList.toggle("active", section.id === id);
  });

  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
  });

  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", showSection);
showSection();
document.getElementById("enter-btn").addEventListener("click", function () {
  document.body.classList.add("entered");
  window.location.hash = "home";
  showSection();

  // restart the typing effect
  i = 0;
  element.textContent = "";
  type();
});