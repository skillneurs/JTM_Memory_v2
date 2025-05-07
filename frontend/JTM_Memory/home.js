const memory = document.getElementById("memory");
const cartes = Array.from(document.querySelector(".carte"));

// Mélange aléatoire
for (let i = cartes.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cartes[i], cartes[j]] = [cartes[j], cartes[i]];
}

// Ré-injecte les cartes dans l'ordre mélangé
cartes.forEach(carte => memory.appendChild(carte));

/*cartes.addEventListener("click", function(){
    if(cartes = cartes){
        console.log("ces cartes forment une paire")
    }
    else{
        console.log("ces cartes ne forment pas une paire")
    }
})*/