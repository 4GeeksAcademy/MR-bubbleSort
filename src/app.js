import "bootstrap";
import "./style.css";
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const x = parseInt(document.getElementById("amount").value, 10);

    if (isNaN(x) || x < 1 || x > 10) {
      alert("Please insert a number between 1 and 10");
      return;
    }

    const cardContainer = document.querySelector(".container-random-cards");
    cardContainer.innerHTML = "";
    for (let i = 0; i < x; i++) {
      cardContainer.appendChild(createCard());
    }
  });

  const sortButton = document.querySelector("#sort");
  sortButton.addEventListener("click", () => {
    document.querySelector(".sorted-cards").innerHTML = "";
    bubbleSort();
  });
});

function RandomNumberGenerator() {
  const possiblenumberpicks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  return possiblenumberpicks[
    Math.floor(Math.random() * possiblenumberpicks.length)
  ];
}

function RandomPintaGenerator() {
  const pinta = ["heart", "diamond", "club", "spade"];
  return pinta[Math.floor(Math.random() * pinta.length)];
}

function createCard() {
  const card = document.createElement("div");
  card.className = "card";
  const topCorner = document.createElement("span");
  topCorner.className = "top-corner";
  const bottomCorner = document.createElement("span");
  bottomCorner.className = "bottom-corner";
  const cardNumber = document.createElement("span");
  cardNumber.className = "card-number";

  let cardValue = RandomNumberGenerator();
  let selectedPinta = RandomPintaGenerator();

  topCorner.classList.add(selectedPinta);
  bottomCorner.classList.add(selectedPinta);
  cardNumber.innerHTML = cardValue;

  card.dataset.value = getCardValue(cardValue);

  card.appendChild(topCorner);
  card.appendChild(cardNumber);
  card.appendChild(bottomCorner);

  return card;
}

function getCardValue(cardValue) {
  const values = {
    A: 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13
  };
  return values[cardValue];
}

function bubbleSort() {
  const cards = document.querySelectorAll(".container-random-cards .card");
  let cardsArr = Array.from(cards);
  let isSorted = false;
  let lastUnsorted = cardsArr.length - 1;
  let iteration = 1;

  let sortedCardsContainer = document.querySelector(".sorted-cards");
  sortedCardsContainer.innerHTML = "";

  while (!isSorted) {
    isSorted = true;

    for (let i = 0; i < lastUnsorted; i++) {
      if (
        parseInt(cardsArr[i].dataset.value) >
        parseInt(cardsArr[i + 1].dataset.value)
      ) {
        [cardsArr[i], cardsArr[i + 1]] = [cardsArr[i + 1], cardsArr[i]];
        isSorted = false;
      }
    }

    displayIteration(cardsArr, iteration);

    iteration++;
    lastUnsorted--;
  }
}

function displayIteration(cardsArr, iteration) {
  const iterationContainer = document.createElement("div");
  iterationContainer.classList.add("iteration");
  iterationContainer.innerHTML = `<h3>Iteración ${iteration}</h3>`;
  const iterationCardsContainer = document.createElement("div");
  iterationCardsContainer.classList.add("card-container");

  cardsArr.forEach(card => {
    const cardClone = card.cloneNode(true);
    iterationCardsContainer.appendChild(cardClone);
  });

  iterationContainer.appendChild(iterationCardsContainer);
  document.querySelector(".sorted-cards").appendChild(iterationContainer);
}

const sortButton = document.querySelector("#sort");
sortButton.addEventListener("click", bubbleSort);
