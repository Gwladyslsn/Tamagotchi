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

/* PHASE 0 : Activer le Tama 
1) cliquer sur le bouton clearInterval
2) Quand on arrive à 5 clics alors fait naitre le Tama 
*/

const myTama = {
  name: "",
  alive: false,
  fed: 0,
  playful: 0,
  clean: 0,
  lifeDuration: 0,
};

const start = () => {
  const buttonCenter = document.querySelector(
    '.js-button[data-direction="center"]'
  );
  let count = 0;
  buttonCenter.addEventListener("click", () => {
    count++;
    if (count === 5) {
      birth();
    }
  });
};

/* PHASE 1 : naissance du Tama
      1) demander le prénom du Tama
      2) fait eclore mon oeuf pour passer au poussin
      3) affiche mes vitals 
      4) afficher le nom du Tama dans les vitals 
      5) mettre les scores des vitals à 5
*/
const birth = () => {
  // 1) demander le prénom du Tama
  myTama.name = prompt("Quel nom a votre Tama ?");
  // 2) fait eclore mon oeuf pour passer au poussin
  showInScreen("🐣");
  // 3) affiche mes vitals
  const vitals = document.querySelector(".js-vitals");
  vitals.classList.remove("hidden");
  // 4) afficher le nom du Tama dans les vitals
  const nameDisplay = document.querySelector(".js-tamaName");
  nameDisplay.textContent = myTama.name;
  // 5) mettre les scores des vitals à 5
  const defaultScore = 5;
  const scoresDisplay = document.querySelectorAll(".js-score");
  scoresDisplay.forEach((score) => {
    score.textContent = defaultScore;
  });
  myTama.fed = defaultScore;
  myTama.playful = defaultScore;
  myTama.cleaned = defaultScore;
  //6) afficher les actions
  const actions = document.querySelector(".js-actions");
  actions.classList.remove("hidden");
  // 7) appel de la fonction pour le faire grandir
  evolve();
  // 8) calcul de l'humeur
  mood();
  // 9) Calcul de la durée de vie
  lifeDuration();
};

/* PHASE 2 : Evolution 
    1) Attendre que le Tama ait une première envie
    2) Il devient grand 
    3) 
*/

const evolve = () => {
  // 1) attendre la première envie
  const functionToExecute = () => {
    showInScreen("🥰");
  };
  wantsTo(functionToExecute);
};

/* LES ENVIES 
- 😋 : faim, aléatoire minimum 30 sec et max 3 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 3 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes après avoir mangé

1) créer une fonction qu'on peut appeler plus tard dans notre code
2) stocker les envies du Tama dans une variable
3) avec un setTimeout, choisir une envie aléatoire 
4) la durée du setTimeout est dynamique compris dans un intervalle défini
5) afficher l'envie du Tama sur l'écran 
6) envie de faire caca ne peut etre faite que si le tama a mangé 
*/

const wantsTo = (callback) => {
  const needs = ["😋", "🥱", "💩"];
  const minDuration = 1000;
  const maxDuration = 3000;
  const duration = getRandomInt({
    min: minDuration,
    max: maxDuration,
  });
  setTimeout(() => {
    const randomIndexNeeds = getRandomInt({
      max: needs.length,
    });
    const desire = needs[randomIndexNeeds];
    character.textContent = desire;
    if (callback) {
      callback();
    }
  }, duration);
};

/* HUMEUR GENERALE :
Une fonction qui calcule la moyenne des 3 indicateurs : faim, ennuie, propreté
et elle affiche cette moyenne dans les vitals 
*/
const mood = () => {
  const sum = myTama.fed + myTama.playful + myTama.cleaned;
  const average = sum / 3;
  const rounded = Math.round(average);
  const displayMood = document.querySelector(".js-mood");
  displayMood.textContent = rounded;
};

/* DUREE DE VIE 
une fonction qui, toutes les minutes, met à jour la durée de vie du Tama. 
*/
const lifeDuration = () => {
  const displayLifeDuration = document.querySelector(".js-life-duration");
  const duration = 60000; // 60 secondes
  setInterval(() => {
    myTama.lifeDuration++;
    displayLifeDuration.textContent = myTama.lifeDuration;
  }, duration);
};

// Fonction qui retourne un nombre aléatoire entre un min et max
const getRandomInt = (props) => {
  const max = props.max; // ternaire = condition "raccourcies" = conditions ? valeur si oui : valeur si non
  const min = props.min ? props.min : 0;
  return Math.floor(Math.random() * (max - min) + min);
};

// fonction qui gère l'affichage des emoticones
const character = document.querySelector(".js-character");
const showInScreen = (display) => {
  character.textContent = display;
};

// lancer la fonction de début
start();
