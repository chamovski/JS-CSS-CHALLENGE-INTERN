//-------------------------------------------------------------------------IVAN CHAMOVSKI---------------------------------------------------------------------//
let cardsData = [];
let cardIndex = 0;

//--------------------------Load Data From JSON File Start----------------------------//
function loadCardsData() {
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      cardsData = data;
      displayCards();
    })
    .catch((error) => console.error(error));
}
//--------------------------Load Data From JSON File End----------------------------//

//--------------------------Display Cards on Page Start----------------------------//
function displayCards() {
  const container = document.getElementById("card-container");
  for (let i = cardIndex; i < cardIndex + 4 && i < cardsData.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardData = cardsData[i];
    card.innerHTML = `
        <div class="cards">
            <div class="head">
        <div class="profileImg">
            <img src="${cardData.profile_image}" alt="">
        </div>
        <div class="text">
            <h3 class="title">${cardData.name}</h3>
            <p>${cardData.date}</p>
        </div>
        <div class="icon">
        <img src="${
          cardData.source_type === "facebook"
            ? "../icons/facebook.svg"
            : "../icons/instagram-logo.svg"
        }" alt="" class="src">
        </div>
    </div>
    <div class="image">
        <img src="${cardData.image}" alt="">
    </div>
    <div class="desc">
        <p>${cardData.caption}</p>
    </div>
    <div class="like">
        <button class="likea" id="likea">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        </button>
        <span class="numberOfLikes">${cardData.likes}</span>
    </div>
</div>
    `;
    container.appendChild(card);
  }
  cardIndex += 4;
  if (cardIndex >= cardsData.length) {
    const loadMoreButton = document.getElementById("load-more");
    loadMoreButton.style.display = "none";
  }
}
//--------------------------Display Cards on Page End----------------------------//

//--------------------------Load initial Cards and Load More Button Start----------------------------//
window.onload = function () {
  loadCardsData();
  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.addEventListener("click", displayCards);
};
//--------------------------Load initial Cards and Load More Button End----------------------------//

//--------------------------Like Button Start----------------------------//
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("card-container");

  container.addEventListener("click", function (event) {
    const likeButton = event.target.closest(".likea");
    const numberOfLikes = likeButton.parentNode.querySelector(".numberOfLikes");

    if (likeButton) {
      if (!likeButton.classList.contains("liked")) {
        likeButton.classList.add("liked");
        numberOfLikes.innerText = parseInt(numberOfLikes.innerText) + 1;
      } else {
        likeButton.classList.remove("liked");
        numberOfLikes.innerText = parseInt(numberOfLikes.innerText) - 1;
      }
    }
  });
});
//--------------------------Like Button End----------------------------//

//--------------------------Number Of Columns Setting Start----------------------------//
const select = document.getElementById("numberOfColumns");
const styleChange = document.getElementById("card-container");
let selectedStyle = select.value;

function setGridColumns() {
  let gridColumns = "";
  for (let i = 1; i <= selectedStyle; i++) {
    gridColumns += "1fr ";
  }
  styleChange.style.gridTemplateColumns = gridColumns;
}

function resetStyles() {
  styleChange.style.gridTemplateColumns = "";
  styleChange.style.width = "";
}

select.addEventListener("change", function () {
  selectedStyle = select.value;
  setGridColumns();
});

window.addEventListener("resize", function () {
  resetStyles();
  setGridColumns();
});
//--------------------------Number Of Columns Setting End-----------------------------//

//--------------------------Card Color Background Setting Start----------------------------//
let colorInput = document.getElementById("cardBackgroundColor");

colorInput.addEventListener("input", function () {
  let color = colorInput.value;

  let cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.backgroundColor = color;
  }
});
//--------------------------Card Color Background Setting End----------------------------//

//--------------------------Card Space Between Setting Start----------------------------//
const cardGapInput = document.getElementById("cardSpaceBetween");
const cardContainer = document.getElementById("card-container");

cardGapInput.addEventListener("input", function () {
  const cardGap = this.value;
  cardContainer.style.gap = cardGap;
});
//--------------------------Card Space Between Setting End----------------------------//

//--------------------------Choose Theme Setting Start----------------------------//
function setDarkTheme() {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add("dark");
  }
}

function setLightTheme() {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("dark");
    cards[i].classList.add("light");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const lightRadio = document.getElementById("lightTheme");
  const darkRadio = document.getElementById("darkTheme");

  darkRadio.addEventListener("change", setDarkTheme);
  lightRadio.addEventListener("change", setLightTheme);
});
//--------------------------Choose Theme Setting End----------------------------//

//--------------------------Filter by Source Setting Start----------------------------//
const allBtn = document.getElementById("all");
const instagramBtn = document.getElementById("instagram");
const facebookBtn = document.getElementById("facebook");
const twitterBtn = document.getElementById("twitter");

allBtn.addEventListener("change", filterBySource);
instagramBtn.addEventListener("change", filterBySource);
facebookBtn.addEventListener("change", filterBySource);
twitterBtn.addEventListener("change", filterBySource);

function filterBySource() {
  const selectedSource = document.querySelector(
    'input[name="filterBySource"]:checked'
  ).value;
  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    const cardSource = cardsData[i].source_type;
    if (selectedSource === "all" || selectedSource === cardSource) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
}
//--------------------------Filter by Source Setting End----------------------------//
