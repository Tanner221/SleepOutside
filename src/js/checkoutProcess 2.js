import getLocalStorage from './cart.js';
async function CalculateSubtotal() {
  const cart_itmes = await getLocalStorage('so-cart');
  const item_cout = cart_itmes.length();
  let total = 0;
  cart_itmes.forEach((item) => {});
}
