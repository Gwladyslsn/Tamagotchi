/* 
État de notre Tamastudi possibles :
- 🥚 : partie non lancée) 
- 🐣 : naissance pendant tant qu'il n'a pas fait son 1er caca
Ensuite il devient un "grand" avec une humeur variable
- 😢 : triste 0/5
- 🙁 : pas content 1/5
- 🙂 : normal 2/5
- 😄 : content 3/5
- 🤗 : heureux 4/5
- 🥰 : très heureux 5/5
- 👻 : mort 0/5 pendant plus d'une minute 
Ses envies :
- 😋 : faim, aléatoire minimum 30 sec et max 3 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 3 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes après avoir mangé
*/

/* PHASE 1 : naissance du Tama
      1) demander le prénom du Tama
      2) fait eclore mon oeuf pour passer au poussin
      3) affiche mes vitals 
      4) afficher le nom du Tama dans les vitals 
      5) mettre les scores des vitals à 5
*/

/* PHASE 0 : Activer le Tama 
1) cliquer sur le bouton clearInterval
2) Quand on arrive à 5 clics alors fait naitre le Tama 
*/

const buttonCenter = document.querySelector(
  '.js-button[data-direction="center"]'
);
console.log(buttonCenter);

const startTama = () => {
  // 1) demander le prénom du Tama
  const tamaName = prompt("Quel nom a votre Tama ?");
  // 2) fait eclore mon oeuf pour passer au poussin
  const character = document.querySelector(".js-character");
  character.textContent = "🐣";
  // 3) affiche mes vitals
  const vitals = document.querySelector(".js-vitals");
  vitals.classList.remove("hidden");
  // 4) afficher le nom du Tama dans les vitals
  const nameDisplay = document.querySelector(".js-tamaName");
  nameDisplay.textContent = tamaName;
  // 5) mettre les scores des vitals à 5
  const scoresDisplay = document.querySelectorAll(".js-score");
  scoresDisplay.forEach((score) => {
    score.textContent = 5;
  });
};
