async function getLocalStorage(key) {
  return JSON.parse(await localStorage.getItem(key));
}

 HEAD
async function getCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
function displayTotal(total) {
  //display surrounding div (will include checkout button)
  const element = document.querySelector('.cart-footer');
  element.style.display = 'block';
  //display total
  const totalElement = document.querySelector('#cart-total')
  totalElement.innerHTML = `Total: ${total}`;
}

async function getCartContents() {
  const cartItems = await getLocalStorage('so-cart');
  if (cartItems != null) {
    const prices = cartItems.map((item) => item.FinalPrice);
    const total = prices.reduce((partialSum, a) => partialSum + a, 0);
    displayTotal(total)
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  }
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

function renderCartItem(item) {
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
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

}
// const cartElement = document.getElementById('cart');
// let angle = 0;

// setInterval( () => {
//     angle = (angle + 2) % 360;
//     squareElement.style.transform = `rotate(${angle}deg)`
// }, 1000/60);
// cancelAnimationFrame(id);
getCartContents();

