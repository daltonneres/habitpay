// SCROLL SUAVE
function scrollToForm() {
  document.getElementById("form").scrollIntoView({ behavior: "smooth" });
}

// ANIMAÇÃO SCROLL
const elements = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

// SIMULAÇÃO STREAK
let dias = 7;
const streak = document.getElementById("streak");

setInterval(() => {
  dias++;
  streak.innerText = dias + " dias de consistência 🔥";
}, 4000);

// FORM
function enviar(e) {
  e.preventDefault();
  alert("Você entrou na lista 🚀");
}

// 📊 GRÁFICO SIMPLES
const canvas = document.getElementById("grafico");
const ctx = canvas.getContext("2d");

let pontos = [20, 30, 40, 55, 70, 85, 100];
let progresso = 0;

function desenharLinha() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, 250 - pontos[0]);

  for (let i = 0; i < progresso; i++) {
    ctx.lineTo(i * 60, 250 - pontos[i]);
  }

  ctx.strokeStyle = "#22C55E";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function animarGrafico() {
  if (progresso < pontos.length) {
    progresso++;
    desenharLinha();
    setTimeout(animarGrafico, 300);
  }
}

animarGrafico();