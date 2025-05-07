const memory = document.getElementById("memory");
const cartes = Array.from(document.querySelectorAll(".carte")); // tableau des cartes

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

cartes.forEach(carte => {
  carte.addEventListener("click", () => {
    if (verrouillage || carte.classList.contains("trouvee") || carte.classList.contains("visible")) {
      return;
    }

    carte.classList.add("visible");
    cartesRetournees.push(carte);

    if (cartesRetournees.length === 2) {
      verrouillage = true;
      const [carte1, carte2] = cartesRetournees;

      if (carte1.dataset.valeur === carte2.dataset.valeur) {
        // Paire trouvée
        console.log("🎉 Paire trouvée :", carte1.dataset.valeur);
        carte1.classList.add("trouvee");
        carte2.classList.add("trouvee");
        cartesRetournees = [];
        verrouillage = false;
      } else {
        // Pas une paire -> cacher après délai
        console.log("❌ Pas une paire");
        setTimeout(() => {
          carte1.classList.remove("visible");
          carte2.classList.remove("visible");
          cartesRetournees = [];
          verrouillage = false;
        }, 1000);
      }
    }
  });
});