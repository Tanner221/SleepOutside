function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export default async function getLocalStorage(key) {
  return JSON.parse(await localStorage.getItem(key));
}

function displayTotal(total) {
  //display surrounding div (will include checkout button)
  const element = document.querySelector(".cart-footer");
  element.style.display = "block";
  //display total
  const totalElement = document.querySelector("#cart-total");
  totalElement.innerHTML = `Total: ${total}`;
}

async function getCartContents() {
  const cartItems = await getLocalStorage("so-cart");
  cartItems.forEach((item) => (item.index = cartItems.indexOf(item)));
  if (cartItems != null) {
    const prices = cartItems.map((item) => item.FinalPrice);
    const total = prices.reduce((partialSum, a) => partialSum + a, 0);
    displayTotal(total);
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
  const buttons = document.querySelectorAll(".cart_remove");
  buttons.forEach((element) => {
    addCartListener(element);
  });
}

function renderCartItem(item) {
  //console.log(item);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <button type="button" class="cart_remove button" data_id="${item.Id}" cart_index="${item.index}"><span>Remove<i class="fa fa-trash" aria-hidden="true"></i></span></button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

function addCartListener(element) {
  element.addEventListener("click", async function () {
    const ItemId = this.getAttribute("data_id");
    const ItemIndex = this.getAttribute("cart_index");
    let cart = await getLocalStorage("so-cart");
    cart.map((CartItem) => {
      if (CartItem.Id == ItemId) {
        const index = cart.indexOf(CartItem);
        if (index == ItemIndex) {
          cart.splice(index, 1);
          setLocalStorage("so-cart", cart);
          document.location.reload();
        }
      }
    });
  });
}

getCartContents();
