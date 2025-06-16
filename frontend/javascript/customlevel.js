// Récupération des éléments du DOM
const increaseBtn = document.getElementById("increase-pairs");
const decreaseBtn = document.getElementById("decrease-pairs");
const playBtn = document.getElementById("play-button");
const pairCountSpan = document.getElementById("pair-count");
const cartesContainer = document.querySelector(".cartes_container");
const increasePairSizeBtn = document.getElementById("increase-pair-size");
const decreasePairSizeBtn = document.getElementById("decrease-pair-size");
const pairSizeSpan = document.getElementById("pair-size");

// Variables d’état
let pairCount = 0;
let pairSize = 2;
let imageIndex = 0;
let lockBoard = false;
let gameStarted = false;

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
  "./img_memo/imgLOL/mordekaise.webp",
  "./img_memo/imgLOL/panthéon.webp",
  "./img_memo/imgLOL/teemo.webp",
  "./img_memo/imgMOVIE/lordofring.webp",
"./img_memo/imgMOVIE/piratec",
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

let shuffledImages = shuffleArray([...imagePaths]);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updatePairCountDisplay() {
  pairCountSpan.textContent = `Nombre de paires (${pairSize} cartes) : ${pairCount}`;
}

function updatePairSizeDisplay() {
  pairSizeSpan.textContent = pairSize;
}

function createCardElement(imageSrc) {
  const card = document.createElement("div");
  card.classList.add("carte");
  card.dataset.image = imageSrc; // Stocke l’image pour comparaison

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "carte";
  cardBack.appendChild(img);

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  // Gestion du clic
  card.addEventListener("click", () => {
    if (!gameStarted || lockBoard || card.classList.contains("flipped") || card.classList.contains("validated")) return;

    card.classList.add("flipped");

    // Vérifie l’état actuel
    const flipped = Array.from(cartesContainer.querySelectorAll(".flipped:not(.validated)"));
    const imagesFlipped = flipped.map(c => c.dataset.image);
    const firstImage = imagesFlipped[0];
    const allSame = imagesFlipped.every(img => img === firstImage);

    // Vérifie si toutes les cartes de cette image sont retournées
    const allSameImageCards = Array.from(cartesContainer.children).filter(c => c.dataset.image === firstImage);
    const allFlippedForImage = allSameImageCards.every(c => c.classList.contains("flipped"));

    if (allFlippedForImage) {
      // Valide les cartes de cette image
      allSameImageCards.forEach(c => {
        c.classList.add("validated");
        c.querySelector(".card-back").style.backgroundColor = "lightgreen";
      });

      // Vérifie victoire
      const allCards = Array.from(cartesContainer.children);
      const allValidated = allCards.every(c => c.classList.contains("validated"));
      if (allValidated) {
        setTimeout(() => alert("🎉 Bravo, tu as gagné !"), 300);
      }
    } else if (!allSame) {
      // Il y a au moins une carte différente → retourne toutes les non validées
      lockBoard = true;
      setTimeout(() => {
        flipped.forEach(c => c.classList.remove("flipped"));
        lockBoard = false;
      }, 1000);
    }
  });

  return card;
}

// Gestion des boutons
increaseBtn.addEventListener("click", () => {
  if (imageIndex >= shuffledImages.length) {
    alert("Plus d’images disponibles.");
    return;
  }
  pairCount++;
  updatePairCountDisplay();
  const imageSrc = shuffledImages[imageIndex];
  for (let i = 0; i < pairSize; i++) {
    cartesContainer.appendChild(createCardElement(imageSrc));
  }
  imageIndex++;
});

decreaseBtn.addEventListener("click", () => {
  if (pairCount > 0) {
    pairCount--;
    updatePairCountDisplay();
    for (let i = 0; i < pairSize; i++) {
      const lastCard = cartesContainer.lastElementChild;
      if (lastCard) cartesContainer.removeChild(lastCard);
    }
    if (imageIndex > 0) imageIndex--;
  }
});

increasePairSizeBtn.addEventListener("click", () => {
  pairSize++;
  updatePairSizeDisplay();
  updatePairCountDisplay();
});

decreasePairSizeBtn.addEventListener("click", () => {
  if (pairSize > 2) {
    pairSize--;
    updatePairSizeDisplay();
    updatePairCountDisplay();
  }
});

playBtn.addEventListener("click", () => {
  if (cartesContainer.children.length === 0) {
    alert("Ajoute au moins une paire avant de jouer !");
    return;
  }
  gameStarted = true;
  shuffleCards();
});

function shuffleCards() {
  const cards = Array.from(cartesContainer.children);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  cartesContainer.innerHTML = "";
  cards.forEach(card => cartesContainer.appendChild(card));
}

// Initialisation
updatePairCountDisplay();
updatePairSizeDisplay();
