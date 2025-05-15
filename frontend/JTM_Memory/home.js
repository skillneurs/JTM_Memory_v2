const memory = document.getElementById("memory");
const cartes = Array.from(document.querySelectorAll(".carte")); // tableau des cartes
const btnrejouer = document.getElementById("rejouer");
//const totalescartes = cartes.length;
//const cartestrouvee = document.querySelectorAll(".trouvee");
const victoire = document.getElementById("victoire");
let score = 0;
let combo = 0;


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
    const img = carte.querySelector("img")
    if(img){
      img.classList.remove("none");
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
        combo ++;
        score +=50 * combo;
        document.getElementById("score").textContent = `Score : ${score}`;
        document.getElementById("combo").textContent = `Combo : ${combo}`;

        if (cartestrouvee.length === 8){
          console.log("terminée");
          victoire.classList.remove("none");
        }

        cartesRetournees = [];
        verrouillage = false;
      } else {
        // Pas une paire -> cacher après délai
        console.log("❌ Pas une paire");
        setTimeout(() => {
          carte1.classList.remove("visible");
          carte2.classList.remove("visible");

          const img1 = carte1.querySelector("img");
          const img2 = carte2.querySelector("img");
          if (img1) img1.classList.add("none");
          if (img2) img2.classList.add("none");

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
})
