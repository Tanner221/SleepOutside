import ExternalServices from './ExternalServices.js';

const services = new ExternalServices();

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

async function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const formData = new FormData(items),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

async function getLocalStorage(key) {
  return JSON.parse(await localStorage.getItem(key));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  async init() {
    this.list = await getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const prices = this.list.map((item) => item.FinalPrice);
    this.itemTotal = prices.reduce((partialSum, a) => partialSum + a, 0);
    this.numItems = prices.length;
    //calculate shipping and tax
    this.calculateOrdertotal();
  }
  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = 10;
    this.shipping += ((this.numItems - 1) * 2);
    this.tax = this.itemTotal * .06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
    // display the totals.
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    let OrderSummary = document.querySelector(this.outputSelector);
    const results = ` <p>Item Subtotal: <span class='right-align'>$${this.itemTotal.toFixed(2)}</span></p>
                      <p>Shipping Estimate: <span class='right-align'>$${this.shipping.toFixed(2)}</span></p>
                      <p>Tax: <span class='right-align'>$${this.tax.toFixed(2)}</span></p>
                      <p><b>Order Total: <span class='right-align'>$${this.orderTotal.toFixed(2)}</span></b></p>`;
    OrderSummary.innerHTML = results;
  }

  async checkout() {
    const formElement = document.getElementById('checkout');
    const json = await packageItems(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = this.list;
    try {
      await services.checkout(json);
      const successMessage = 'Congradulations, your order has been placed.';
      const displaySuccess = document.getElementById('SuccessMessage');
      displaySuccess.innerHTML = successMessage;
      displaySuccess.style.display = 'block';
      setLocalStorage('so-cart', {});
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => input.value = '');
    } catch (err) {
      const message = err.message;
      const keys = Object.keys(message);
      const errors = keys.map(key => message[key]);
      const displayErrors = document.getElementById('ErrorMessages');
      let html = '<ul>';
      errors.forEach(error => {
        html +=  `<li>${error}</li>`;
      })
      html += '</ul>';
      displayErrors.innerHTML = html;
      displayErrors.style.display = 'block';
    }
  }
}

const checkoutPage = new CheckoutProcess('so-cart', '#OrderSummary');
checkoutPage.init();
const submitButton = document.getElementById('submitOrder');
submitButton.addEventListener('click', function(e){
  e.preventDefault();
  document.getElementById('SuccessMessage').style.display = 'none';
  document.getElementById('ErrorMessages').style.display = 'none';

  checkoutPage.checkout();
})