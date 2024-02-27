// start game
document.querySelector(".start").addEventListener("click", () => {
  let name = prompt("Enter Player Name :");
  if (name == "" || name == null) {
    document.querySelector(".name span").textContent = "Anonymous";
  } else {
    document.querySelector(".name span").textContent = name;
  }
  startTimer(60);
  document.querySelector(".start").remove();
});

// variables
let duration = 1000;
let matched = 0;
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
    matched += 2;

    document.getElementById("successSound").play();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
    }, duration);
    document.getElementById("failSound").play();
  }
}

// time to solve

function startTimer(duration) {
  const display = document.querySelector(".time span");

  let timer = duration;
  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");

    display.textContent = `${minutes}:${seconds}`;
    if (matched === cards.length) {
      clearInterval(interval);
      showPopup("Congratulations!", "assets/images/sucess.jpg");
      stopClickingEvent();
      document.getElementById("winSound").play();
    }
    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = "00:00";
      showPopup("Time Over!", "assets/images/TimeOver.jpg");
      stopClickingEvent();
      document.getElementById("loseSound").play();
    }
  }, 1000);
}

// Play Again button
document.querySelector(".popup button").addEventListener("click", () => {
  cards.forEach((card) => {
    card.classList.remove("flipped");
    card.classList.remove("matched");
    matched = 0;
    shuffledOrder = shuffle(orderRange);
    cards.forEach((card, index) => {
      card.style.order = shuffledOrder[index];
    });
    startTimer(60);
  });
  hidePopup();
});

function showPopup(title, img) {
  const popup = document.querySelector(".popup");
  popup.querySelector(".popup-title").innerHTML = title;
  popup.querySelector(".popup-img").src = img;
  popup.style.display = "flex";
}

function hidePopup() {
  document.querySelector(".popup").style.display = "none";
}
