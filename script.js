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

const myTama = {
  name: "",
  alive: false,
  fed: 0,
  playfull: 0,
  cleaned: 0,
  lifeDuration: 0,
  desire: "",
};

/* PHASE 0 : activer le tamastudi 
1) Cliquer sur le bouton du milieu
2) Ajouter un compteur qui attend d'avoir une valeur max de 5
3) Alors on fait naitre notre tama
*/
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
  myTama.fed = defaultScore;
  myTama.playfull = defaultScore;
  myTama.cleaned = defaultScore;
  updateVitals();
  //6) afficher les actions
  const actions = document.querySelector(".js-actions");
  actions.classList.remove("hidden");
  // 7) appel de la fonction pour le faire grandir
  evolve();
  //8) calcul durée de vie
  myTama.alive = true;
  calcLifeDuration();
};

/* PHASE 2 : Evolution 
    1) Attendre que le Tama ait une première envie
    2) Il devient grand 
    3) 
*/
const evolve = () => {
  // 1) attendre la première envie
  const functionToExecute = () => {
    mood();
    cycleOfAdultLife();
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
    if (callback) {
      callback(desire);
    } else {
      showInScreen(desire, true);
    }
  }, duration);
};

/* HUMEUR GENERALE :
Une fonction qui calcule la moyenne des 3 indicateurs : faim, ennuie, propreté
et elle affiche cette moyenne dans les vitals 
*/
const mood = () => {
  // partie 1 : Affichage numerique
  const sum = myTama.fed + myTama.playfull + myTama.cleaned;
  const average = sum / 3;
  const rounded = Math.round(average);
  const displayMood = document.querySelector(".js-mood");
  displayMood.textContent = rounded;
  // partie 2 : affichage visuel
  const listOfEmojis = ["😢", "🙁", "🙂", "😄", "🤗", "🥰"];
  showInScreen(listOfEmojis[rounded]);
  // mort ?
  if (rounded === 0) {
    myTama.alive = false;
  }
};

/* DUREE DE VIE 
une fonction qui, toutes les minutes, met à jour la durée de vie du Tama. 
*/
const calcLifeDuration = () => {
  const displayLifeDuration = document.querySelector(".js-life-duration");
  const duration = 60000; // 60 secondes
  setInterval(() => {
    myTama.lifeDuration++;
    displayLifeDuration.textContent = myTama.lifeDuration;
  }, duration);
};

/* Gestion de vie adulte : 
- Notre tama a une humeur générale
- cette humeur est la moyenne de 3 indicateurs
=> fonction mood() déja codé 
- ces indicateurs évoluent avec le temps
=> A FAIRE 
- de Temps en temps, notre Tama a une envie
=> wantsTo() deja codé 
- si on ne reponds pas à cette envie dans les temps : l'indicateur associé diminue
- si on réponds dans les temps : l'indicateur augmente
- et ça continue jusqu'a la mort du Tama
=> A FAIRE
*/

const cycleOfAdultLife = () => {
  if (myTama.alive) {
    const functionToExecute = (desire) => {
      showInScreen(desire, true);
      myTama.desire = desire;
      waitForAction();
    };
    wantsTo(functionToExecute);
  } else {
    showInScreen("👻");
  }
};

let timeoutWaitForAction = null;
const waitForAction = () => {
  timeoutWaitForAction = setTimeout(() => {
    manageIndicators(myTama.desire, false);
    showInScreen("", true);
    cycleOfAdultLife();
  }, 5000);
};

const buttonsAction = document.querySelectorAll(".js-button-action");
buttonsAction.forEach((button) => {
  button.addEventListener("click", () => {
    const associateDesire = button.getAttribute("data-desire");
    const tamaDesireString = translateEmoji(myTama.desire);
    const isGoodButton = tamaDesireString === associateDesire;
    if (isGoodButton) {
      clearTimeout(timeoutWaitForAction);
      manageIndicators(myTama.desire, isGoodButton);
      cycleOfAdultLife();
    }
  });
});

const translateEmoji = (emoji) => {
  let word = "";
  if (emoji === "😋") word = "eat";
  else if (emoji === "🥱") word = "play";
  else if (emoji === "💩") word = "clean";
  return word;
};

const manageIndicators = (desire, hasSucceeded) => {
  const numberToAdd = hasSucceeded ? 1 : -1;
  const calculName = hasSucceeded ? "addition" : "substraction";
  if (desire === "😋" && verifyIndicatorBeforeCalcul(myTama.fed, calculName)) {
    myTama.fed += numberToAdd;
  } else if (
    desire === "🥱" &&
    verifyIndicatorBeforeCalcul(myTama.playfull, calculName)
  ) {
    myTama.playfull += numberToAdd;
  } else if (
    desire === "💩" &&
    verifyIndicatorBeforeCalcul(myTama.cleaned, calculName)
  ) {
    myTama.cleaned += numberToAdd;
  }
  updateVitals();
  mood();
  if (hasSucceeded) {
    showInScreen("", true);
  }
};

const verifyIndicatorBeforeCalcul = (value, calculName) => {
  // verifier si l'indicateur peut etre incrémenter ou décrémenter
  if (calculName === "addition") {
    return value < 5;
  } else {
    return value > 0;
  } // vrai ou faux
};

const updateVitals = () => {
  // affiche dans les vitals la valeur des 3 indicateurs
  const displayIndicatorEat = document.querySelector(".js-score--eat");
  displayIndicatorEat.textContent = myTama.fed;
  const displayIndicatorPlay = document.querySelector(".js-score--play");
  displayIndicatorPlay.textContent = myTama.playfull;
  const displayIndicatorClean = document.querySelector(".js-score--clean");
  displayIndicatorClean.textContent = myTama.cleaned;
};

// Fonction qui retourne un nombre aléatoire entre un min et max
const getRandomInt = (props) => {
  const max = props.max;
  const min = props.min ? props.min : 0; // ternaire = condition "raccourcies" = conditions ? valeur si oui : valeur si non
  return Math.floor(Math.random() * (max - min) + min);
};

// fonction qui gère l'affichage des emoticones
const character = document.querySelector(".js-character");
const desire = document.querySelector(".js-desire");
const showInScreen = (display, isDesire) => {
  if (isDesire) {
    desire.textContent = display;
  } else {
    character.textContent = display;
  }
};

// lancer la fonction de début
start();
