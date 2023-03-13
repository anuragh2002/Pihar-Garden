if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Add to cart button

function ready() {
  const removeButtons = document.getElementsByClassName("remove-button");

  for (let i = 0; i < removeButtons.length; i++) {
    const button = removeButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  const addToCartButtons = document.getElementsByClassName("card-button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  removeTotalContent();
}

function addToCartClicked(event) {
  let button = event.target;
  let card = button.parentElement;
  let title = card.getElementsByClassName("card-heading")[0].innerText;
  let price = card
    .getElementsByClassName("card-price")[0]
    .innerText.split(" ")[1];
  // console.log(title, price);
  addItemToCart(title, price);
  updateCartTotal();
}

function addItemToCart(title, price) {
  let cartRow = document.createElement("div");
  let cartHr = document.createElement("hr");
  cartRow.classList.add("card");
  // cartRow.innerText = title;
  let cart = document.getElementsByClassName("cart-content")[0];
  let cartItems = cart.getElementsByClassName("card-heading");
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].innerText == title) {
      alert("This item is already added to cart");
      return;
    }
  }
  let cartRowContent = `
  <div class="content">
   <h6 class="card-heading" id="header">${title}</h6>
   <p class="col-12 card-price">₹ ${price}</p>
  </div>
  <input type="number" id="quantity" class="quantity" name="quantity" value="1">
  <button class="col-2 remove-button">Remove</button> 
  `;
  cartRow.innerHTML = cartRowContent;
  cart.append(cartRow);
  cart.append(cartHr);
  updateCartTotal();
  cartRow
    .getElementsByClassName("remove-button")[0]
    .addEventListener("click", removeCartItem);
  ready();
}

function removeTotalContent() {
  const cart = document.getElementsByClassName("cart-content");
  const cards = cart.getElementsByClassName("card");
  const total = document.querySelector("total-content");
  if (cards.length < 0) {
    total.remove();
  }
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal(); //Whenever input changes, cart is updated
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  removeHr();
  updateCartTotal();
  removeTotalContent();
}

function removeHr() {
  let hrElement = document.getElementsByTagName("hr");
  for (let i = 0; i < hrElement.length; i++) {
    let prevElement = hrElement[i].nextElementSibling;
    if (prevElement === null) {
      hrElement[i].remove();
    }
  }
}

function updateCartTotal() {
  let cart = document.getElementsByClassName("cart")[0];
  let cartRows = cart.getElementsByClassName("card");

  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("card-price")[0];
    let quantityElement = cartRow.getElementsByClassName("quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("₹ ", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName("sub-total-price")[0].innerText =
    "₹ " + total;
  document.getElementsByClassName("total-price")[0].innerText = "₹ " + total;
}

// Search Functionality

function searchCards() {
  const input = document.querySelector("input");
  const filter = input.value.toUpperCase();
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach((accordion) => {
    accordion.style.display = "none";
  });

  const accordionsToShow = [];

  for (let i = 0; i < accordionItems.length; i++) {
    const cards = accordionItems[i].querySelectorAll(".card");

    for (let j = 0; j < cards.length; j++) {
      const title = cards[j].querySelector("h6").textContent.toUpperCase();
      // const content = card.querySelector('p').textContent.toUpperCase();
      if (title.includes(filter)) {
        cards[j].style.display = "";
        // cards[j].parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "";
        accordionsToShow.push(
          cards[j].closest(".accordion-item").getAttribute("id")
        );
      } else {
        cards[j].style.display = "none";
        // cards[j].parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "";
      }
    }
  }

  accordionsToShow.forEach((id) => {
    const accordionsToDisplay = document.getElementById(id);
    accordionsToDisplay.style.display = "";
  });
}

const input = document.querySelector("input");
input.addEventListener("keyup", searchCards);
