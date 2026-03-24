// IMPORTS (Firebase)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyD2P3ezHhw1IRPYw0UHoCdEWxlNVGf6lOA",
  authDomain: "habitleads.firebaseapp.com",
  projectId: "habitleads",
  storageBucket: "habitleads.firebasestorage.app",
  messagingSenderId: "504905977621",
  appId: "1:504905977621:web:b32087a67be87355cae31c"
};

// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ESPERA DOM CARREGAR (🔥 evita bugs)
document.addEventListener("DOMContentLoaded", () => {

  // SCROLL SUAVE
  window.scrollToForm = function () {
    document.getElementById("form").scrollIntoView({ behavior: "smooth" });
  };

  // ADMIN
  window.irAdmin = function () {
    window.location.href = "admin.html";
  };

  // ANIMAÇÃO SCROLL
  const elements = document.querySelectorAll(".fade");

  function checkScroll() {
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  window.addEventListener("load", checkScroll);

  // 📊 GRÁFICO RESPONSIVO + ANIMAÇÃO CONTROLADA
  const canvas = document.getElementById("grafico");

  if (canvas) {
    const ctx = canvas.getContext("2d");

    let pontos = [20, 30, 40, 55, 70, 85, 100];
    let progresso = 0;
    let animado = false;

    function desenharLinha() {
      const altura = canvas.height;
      const largura = canvas.width;

      ctx.clearRect(0, 0, largura, altura);

      ctx.beginPath();
      ctx.moveTo(0, altura - pontos[0]);

      for (let i = 0; i < progresso; i++) {
        ctx.lineTo(
          i * (largura / pontos.length),
          altura - pontos[i]
        );
      }

      ctx.strokeStyle = "#22C55E";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    function animarGrafico() {
      if (animado) return;

      const pos = canvas.getBoundingClientRect().top;

      if (pos < window.innerHeight) {
        animado = true;

        function loop() {
          if (progresso < pontos.length) {
            progresso++;
            desenharLinha();
            setTimeout(loop, 300);
          }
        }

        loop();
      }
    }

    window.addEventListener("scroll", animarGrafico);
  }

});

// 🚀 ENVIO FORM (melhor UX + timestamp correto)
window.enviar = async function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const btn = document.querySelector(".form button");

  try {
    await addDoc(collection(db, "leads"), {
      nome: nome.value,
      email: email.value,
      data: serverTimestamp()
    });

    // limpa campos
    nome.value = "";
    email.value = "";

    // feedback visual
    btn.innerText = "Enviado ✔";
    btn.style.background = "#16a34a";

    setTimeout(() => {
      btn.innerText = "Entrar na lista 🚀";
      btn.style.background = "";
    }, 2000);

  } catch (erro) {
    console.error(erro);
    alert("Erro ao enviar");
  }
};