// start game
document.querySelector(".start").addEventListener("click", () => {
  let name = prompt("Enter Player Name :");
  if (name == "" || name == null) {
    document.querySelector(".name span").textContent = "Anonymous";
  } else {
    document.querySelector(".name span").textContent = name;
  }

  document.querySelector(".start").remove();
});

// variables
let duration = 1000;
let blocksContainer = document.querySelector(".block-grid");
let cards = Array.from(blocksContainer.children);
let orderRange = [...Array(cards.length).keys()];

let shuffledOrder = shuffle(orderRange);
cards.forEach((card, index) => {
  card.style.order = shuffledOrder[index];

  card.addEventListener("click", () => {
    flipCard(card);

    let allFlippedCards = cards.filter((card) =>
      card.classList.contains("flipped")
    );
    if (allFlippedCards.length === 2) {
      stopClickingEvent();
      checkMatch(allFlippedCards[0], allFlippedCards[1]);
    }
  });
});

function flipCard(card) {
  card.classList.add("flipped");
}
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function stopClickingEvent() {
  blocksContainer.classList.add("stopClicking");
  setTimeout(() => {
    blocksContainer.classList.remove("stopClicking");
  }, duration);
}
// check matching cards
function checkMatch(firstCard, secondCard) {
  if (firstCard.dataset.tech === secondCard.dataset.tech) {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    document.getElementById("successSound").play();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
    }, duration);
    document.getElementById("failSound").play();
  }
}
