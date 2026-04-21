import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔐 LOGIN
window.logar = function() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (
    user === "habitpay" &&
    (pass === "daltonadm")
  ) {
    document.getElementById("login").style.display = "none";
    document.getElementById("painel").style.display = "block";

    carregarLeads();
  } else {
    alert("Acesso negado");
  }
};

// 📊 CARREGAR LEADS
function carregarLeads() {
  const lista = document.getElementById("lista");

  const q = query(collection(db, "leads"), orderBy("data", "desc"));

  onSnapshot(q, (snapshot) => {
    lista.innerHTML = "";

    snapshot.forEach((doc) => {
      const lead = doc.data();

      const div = document.createElement("div");
      div.classList.add("card");

      const dataFormatada = lead.data
        ? new Date(lead.data.seconds * 1000).toLocaleString()
        : "Sem data";

      div.innerHTML = `
        <div class="nome">${lead.nome}</div>
        <div class="email">${lead.email}</div>
        <div class="data">${dataFormatada}</div>
      `;

      lista.appendChild(div);
    });
  });
}