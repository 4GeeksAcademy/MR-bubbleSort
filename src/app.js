const cards = document.querySelectorAll(".card");
const cardAmount = document.querySelector("form");


cards.forEach(card => {
    let topcorner = card.querySelector(".top-corner");
    let bottomcorner = card.querySelector(".bottom-corner");
    let cardnumber = card.querySelector(".card-number");

    let selectedpinta = RandomPintaGenerator();

    topcorner.classList.remove(topcorner.classList.item(1));
    topcorner.classList.add(selectedpinta);
    bottomcorner.classList.remove(bottomcorner.classList.item(1));
    bottomcorner.classList.add(selectedpinta);
    cardnumber.innerHTML = RandomNumberGenerator();
  });

let RandomNumberGenerator = () => {
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
  const numbertopick = Math.floor(Math.random() * possiblenumberpicks.length);
  return possiblenumberpicks[numbertopick];
};

let RandomPintaGenerator = () => {
  const pinta = ["heart", "diamond", "club", "spade"];
  const pintatopick = Math.floor(Math.random() * pinta.length);
  return pinta[pintatopick];
};


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



const form = document.querySelector("form");
form.addEventListener("submit", event => {
  event.preventDefault();
  const x = parseInt(document.getElementById("amount").value, 10); 

  if (isNaN(x) || x < 1 || x > 10) {
    alert("Please insert a number between 1 and 10");
    return;
  }

  const cardContainer = document.querySelector(".container-random-cards");
  cardContainer.innerHTML = '';
  for (let i = 0; i < x; i++) {
    cardContainer.appendChild(createCard());
  }
});

function getCardValue(cardValue) {
  const values = { "A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13 };
  
  return values[cardValue];
}
function selectionSort() {
  const cards = document.querySelectorAll(".container-random-cards .card");
  const cardsArr = Array.from(cards).map(card => card.cloneNode(true));

  for (let i = 0; i < cardsArr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < cardsArr.length; j++) {
      if (parseInt(cardsArr[j].dataset.value) < parseInt(cardsArr[minIndex].dataset.value)) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [cardsArr[i], cardsArr[minIndex]] = [cardsArr[minIndex], cardsArr[i]];
    }
  }
  const sortedCardContainer = document.querySelector(".sorted-cards");
  sortedCardContainer.innerHTML = '';
  cardsArr.forEach(card => sortedCardContainer.appendChild(card));
}
const sortButton = document.querySelector("#sort"); 
sortButton.addEventListener("click", selectionSort);