// import getLocalStorage() from './product.js';

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.getProduct();
    this.renderProductDetails();
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  renderProductDetails() {
    const src = this.product.Image;
    document.getElementById("productImage").src = src;
    document.getElementById("productImage").alt = this.product.NameWithoutBrand;
    document.getElementById(
      "productName"
    ).innerHTML = this.product.NameWithoutBrand;
    document.getElementById("productPrice").innerHTML =
      "$" + this.product.FinalPrice;
    document.getElementById("productDiscount").innerHTML = `$ ${(
      this.product.SuggestedRetailPrice - this.product.FinalPrice
    ).toFixed(2)} OFF`;
    const colors = this.product.Colors.map((item) => item.ColorName);
    document.getElementById("productColor").innerHTML = colors.join("/");
    document.getElementById(
      "productDescription"
    ).innerHTML = this.product.DescriptionHtmlSimple;
    // console.log(document.getElementById('productName'));
  }

  addToCart() {
    let currentItems = getLocalStorage("so-cart");
    if (currentItems != null) {
      currentItems.push(this.product);
      setLocalStorage("so-cart", currentItems);
    } else {
      const productList = [this.product];
      setLocalStorage("so-cart", productList);
    }
    const cart = document.querySelector(".cart");
    cart.classList.add("shakeanimation");
    console.log(cart);
  }
}
