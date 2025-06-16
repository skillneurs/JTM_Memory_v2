const memory = document.getElementById("memory");
const cartes = Array.from(document.querySelectorAll(".carte")); // tableau des cartes
const btnrejouer = document.getElementById("rejouer");
//const totalescartes = cartes.length;
//const cartestrouvee = document.querySelectorAll(".trouvee");
const victoire = document.getElementById("victoire");
const scoreElements = document.querySelectorAll(".score");
let score = 0;
let combo = 0;
//let timer = 0;

console.log("Cartes récupérées :", cartes.map(c => c.dataset.valeur)); // affiche les valeurs avant mélange

// Mélange aléatoire (Fisher-Yates)
for (let i = cartes.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cartes[i], cartes[j]] = [cartes[j], cartes[i]];
}

console.log("Cartes mélangées :", cartes.map(c => c.dataset.valeur)); // affiche l'ordre après mélange

// Réinjecte les cartes mélangées dans le DOM
cartes.forEach(carte => memory.appendChild(carte));

console.log("Cartes réinjectées dans le DOM.");

let cartesRetournees = [];
let verrouillage = false;
let cartestrouvee = [];

cartes.forEach(carte => {
  carte.addEventListener("click", () => {
    if (verrouillage || carte.classList.contains("trouvee") || carte.classList.contains("visible")) {
      return;
    }

    carte.classList.add("visible");
    carte.classList.remove("padding");
    const img = carte.querySelector("img");
    if (img) {
      img.classList.remove("none");
      img.classList.add("rotate");
    }
    cartesRetournees.push(carte);

    if (cartesRetournees.length === 2) {
      verrouillage = true;
      const [carte1, carte2] = cartesRetournees;


      if (carte1.dataset.valeur === carte2.dataset.valeur) {
        // Paire trouvée
        console.log("🎉 Paire trouvée :", carte1.dataset.valeur);
        carte1.classList.add("trouvee");
        carte2.classList.add("trouvee");
        cartestrouvee.push(1);
        combo++;
        score += 50 * combo;
        scoreElements.forEach(el => {
          el.textContent = `Score : ${score}`;
        });
        document.getElementById("combo").textContent = `Combo : ${combo}`;

        if (cartestrouvee.length === 8) {
          console.log("terminée");
          

          const scoreFinal = score; 
        
        fetch("../log/ajouter_score.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            score: scoreFinal
          })
        })
          .then(response => response.text())
          .then(data => {
            console.log("✅ Score envoyé :", data);
          })
          .catch(error => {
            console.error("❌ Erreur envoi score :", error);
          });
        }

        cartesRetournees = [];
        verrouillage = false;
      } else {
        // Pas une paire -> cacher après délai
        console.log("❌ Pas une paire");
        setTimeout(() => {
          carte1.classList.remove("visible");
          carte2.classList.remove("visible");
          carte1.classList.add("padding");
          carte2.classList.add("padding");

          const img1 = carte1.querySelector("img");
          const img2 = carte2.querySelector("img");
          if (img1) img1.classList.add("none");
          if (img2) img2.classList.add("none");

          score -= 20;
          scoreElements.forEach(el => {
            el.textContent = `Score : ${score}`;
          });
          combo = 0;
          cartesRetournees = [];
          verrouillage = false;
        }, 1000);
      }
    }
  });
});

btnrejouer.addEventListener("click", () => {
  window.location.reload()
  score = 0;
  combo = 0;
})
