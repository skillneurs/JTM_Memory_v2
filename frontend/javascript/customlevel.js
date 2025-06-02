// Récupération des éléments du DOM
const increaseBtn = document.getElementById("increase-pairs"); // Bouton "+"
const decreaseBtn = document.getElementById("decrease-pairs"); // Bouton "-"
const playBtn = document.getElementById("play-button");       // Bouton "Play"
const pairCountSpan = document.getElementById("pair-count");   // Affichage du nombre de paires
const cartesContainer = document.querySelector(".cartes_container"); // Conteneur des cartes

// Variables d'état du jeu
let pairCount = 0;        // Nombre initial de paires affichées
let imageIndex = 0;       // Index pour suivre quelle image est utilisée pour les paires
let gameStarted = false;  // Booléen indiquant si le jeu a commencé (clic sur Play)
let firstCard = null;     // Première carte cliquée dans une paire en cours
let secondCard = null;    // Seconde carte cliquée dans une paire en cours
let thirdCard = null;    //  3em  carte cliquée dans une paire en cours
let lockBoard = false;    // Verrouille le plateau lors de l'animation (empêche clics intempestifs)
let flippedCount = 0;     // Compte le nombre total de cartes retournées (trouvées)

// Création et ajout dans le DOM du message de victoire (caché par défaut)
const winMessage = document.createElement("div");
winMessage.id = "win-message";
winMessage.textContent = "🎉 Bravo, tu as gagné !";
winMessage.style.display = "none";  // Masqué au départ
document.body.appendChild(winMessage);

// Création et ajout dans le DOM du bouton "Rejouer" (caché au départ)
const restartBtn = document.createElement("button");
restartBtn.id = "restart-button";
restartBtn.textContent = "Rejouer";
restartBtn.style.display = "none";
document.body.appendChild(restartBtn);

// Tableau contenant les chemins des images disponibles dans le dossier "img"
const imagePaths = [
  "./img/planet.webp",
  "./img_memo/imgPLANET/jupiter.webp",
  "./img_memo/imgPLANET/mars.webp",
  "./img_memo/imgPLANET/mercure.webp",
  "./img_memo/imgPLANET/neptune.webp",
  "./img_memo/imgPLANET/saturne.webp",
  "./img_memo/imgPLANET/terre.webp",
  "./img_memo/imgPLANET/uranus.webp",
  "./img_memo/imgLOL/ash.webp",
  "./img_memo/imgLOL/ahri.webp",
  "./img_memo/imgLOL/azir.webp",
  "./img_memo/imgLOL/caitlyn.webp",
  "./img_memo/imgLOL/heimerdinger.webp",
  "./img_memo/imgLOL/mordekaiser.webp",
  "./img_memo/imgLOL/panthéon.webp",
  "./img_memo/imgLOL/teemo.webp",
  "./img_memo/imgMOVIE/lordofring.webp",
  "./img_memo/imgMOVIE/piratec.webp",
  "./img_memo/imgMOVIE/rogone.webp",
  "./img_memo/imgMOVIE/sea.webp",
  "./img_memo/imgMOVIE/smile.webp",
  "./img_memo/imgMOVIE/spiderman.webp",
  "./img_memo/imgMOVIE/terminator.webp",
  "./img_memo/imgMOVIE/terrifier.webp",
  "./img_memo/imgSW/bb8.webp",
  "./img_memo/imgSW/c3po.webp",
  "./img_memo/imgSW/droidecombat.webp",
  "./img_memo/imgSW/dv.webp",
  "./img_memo/imgSW/étoilenoire.webp",
  "./img_memo/imgSW/jaba.webp",
  "./img_memo/imgSW/mdo.webp",
  "./img_memo/imgSW/mk.webp",
  "./img_memo/imgSW/palpatine.webp",
  "./img_memo/imgSW/redtrooper.webp",
  "./img_memo/imgSW/sond.webp",
  "./img_memo/imgSW/yoda.webp",

   
  
];

// Fonction Fisher-Yates pour mélanger un tableau
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Crée une copie mélangée des images au lancement
let shuffledImages = shuffleArray([...imagePaths]);

// Met à jour l'affichage du nombre de paires à l'écran
function updatePairCountDisplay() {
  pairCountSpan.textContent = `Nombre de paires : ${pairCount}`;
}

// Crée une carte HTML complète avec l'image passée en paramètre
function createCardElement(imageSrc) {
  const card = document.createElement("div");
  card.classList.add("carte"); // Classe CSS pour styliser la carte

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner"); // Conteneur interne (utile pour animation flip)

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front"); // Face avant (visible au départ)

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");  // Face arrière (contient l'image)
  
  // Création et insertion de l'image dans la face arrière
  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "carte";
  cardBack.appendChild(img);

  // Assemblage des faces dans le container interne
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  // Écouteur de clic sur la carte
  card.addEventListener("click", () => {
    // Si le jeu n'a pas commencé, ou que le plateau est verrouillé,
    // ou que la carte est déjà retournée, on ignore le clic
    if (!gameStarted || lockBoard || card.classList.contains("flipped")) return;

    // Ajoute la classe "flipped" pour retourner la carte (CSS s'en charge)
    card.classList.add("flipped");

    // Si aucune carte sélectionnée avant, stocke celle-ci comme "firstCard"
    if (!firstCard) {
      firstCard = card;
    } else {
      // Sinon, c'est la deuxième carte cliquée, on lance la vérification
      secondCard = card;
      checkForMatch();
    }
  });

  return card; // Retourne l'élément DOM créé
}

// Ajoute une paire de cartes avec la prochaine image disponible au clic sur "+"
increaseBtn.addEventListener("click", () => {
  // Si on a déjà utilisé toutes les images disponibles, on bloque
  if (imageIndex >= shuffledImages.length) {
    alert("Plus d’images disponibles.");
    return;
  }

  pairCount++; // Incrémente le compteur de paires
  updatePairCountDisplay();

  // Récupère l'image courante et incrémente l'index
  const imageSrc = shuffledImages[imageIndex];
  imageIndex++;

  // Crée 2 cartes identiques (une paire) et les ajoute au container
  cartesContainer.appendChild(createCardElement(imageSrc));
  cartesContainer.appendChild(createCardElement(imageSrc));
});

// Supprime la dernière paire ajoutée au clic sur "-"
decreaseBtn.addEventListener("click", () => {
  if (pairCount > 0) {
    pairCount--; // Décrémente le compteur de paires
    updatePairCountDisplay();

    // Supprime 2 cartes (une paire) du container
    for (let i = 0; i < 2; i++) {
      const lastCard = cartesContainer.lastElementChild;
      if (lastCard) cartesContainer.removeChild(lastCard);
    }

    // Décrémente l'index d'image utilisé (pour réutiliser cette image)
    if (imageIndex > 0) imageIndex--;
  }
});

// Fonction pour mélanger les cartes dans le container (algorithme Fisher-Yates)
function shuffleCards() {
  const cards = Array.from(cartesContainer.children); // Récupère les cartes dans un tableau

  // Fisher-Yates shuffle classique
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Vide le container
  cartesContainer.innerHTML = "";

  // Réinsère les cartes dans l’ordre mélangé
  cards.forEach(card => cartesContainer.appendChild(card));
}


// Au clic sur "Play"
playBtn.addEventListener("click", () => {
  // Vérifie qu'il y a au moins une paire avant de commencer
  if (cartesContainer.children.length === 0) {
    alert("Ajoute au moins une paire avant de jouer !");
    return;
  }

  // Désactive les boutons pour empêcher modifications pendant le jeu
  increaseBtn.disabled = true;
  decreaseBtn.disabled = true;
  playBtn.disabled = true;

  // Ajoute une classe d'animation pour mélanger visuellement (optionnel)
  const cards = Array.from(cartesContainer.children);
  cards.forEach(card => card.classList.add("shuffle-animation"));

  // Après 500ms (fin animation), on retire la classe et on mélange réellement
  setTimeout(() => {
    cards.forEach(card => card.classList.remove("shuffle-animation"));
    shuffleCards(); // Mélange les cartes dans le DOM
    gameStarted = true; // Le jeu peut commencer, clics sur cartes autorisés
  }, 500);
});

// Vérifie si les deux cartes retournées forment une paire
function checkForMatch() {
  // Récupère les sources des images des deux cartes
  const img1 = firstCard.querySelector("img").src;
  const img2 = secondCard.querySelector("img").src;

  if (img1 === img2) {
    // Si images identiques : paire trouvée
    flippedCount += 2; // Compte les cartes trouvées
    
      firstCard.querySelector(".card-back").style.backgroundColor = "lightgreen";
      secondCard.querySelector(".card-back").style.backgroundColor = "lightgreen";

      // Vérifie si toutes les cartes sont retournées après le délai
      if (flippedCount === cartesContainer.children.length) {
        showWinMessage();
      }

      // Reset les cartes sélectionnées après coloration
      firstCard = null;
      secondCard = null;
   
  } else {
    // Sinon, mauvaise paire → bloque le plateau et retourne les cartes après 1s
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      // Réinitialise les variables pour le prochain essai
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

// Affiche le message de victoire et le bouton "Rejouer"
function showWinMessage() {
  winMessage.style.display = "block";
  restartBtn.style.display = "inline-block";
}

// Événement clic sur "Rejouer"
restartBtn.addEventListener("click", () => {
  // Réinitialise toutes les variables d'état
  gameStarted = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  flippedCount = 0;
  pairCount = 0;  // Repart à 0 pour repartir clean
  imageIndex = 0;

  // Vide le container des cartes pour recommencer à zéro
  cartesContainer.innerHTML = "";

  // Met à jour l'affichage du compteur de paires
  updatePairCountDisplay();

  // Réactive les boutons de contrôle
  increaseBtn.disabled = false;
  decreaseBtn.disabled = false;
  playBtn.disabled = false;

  // Cache le message de victoire et le bouton rejouer
  winMessage.style.display = "none";
  restartBtn.style.display = "none";

  // Remélange les images pour la prochaine partie
  shuffledImages = shuffleArray([...imagePaths]);
});
