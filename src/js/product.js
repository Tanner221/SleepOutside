import ProductData from './productData.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const category = urlParams.get('category');
console.log(id);
console.log(category);

const dataSource = new ProductData(category, id);
// console.log(dataSource.findProductById('880RR'));

const product1 = dataSource.getProduct();
console.log(product1);
let products = [];
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// get tents data
function getProductsData() {
  fetch('../json/tents.json')
    .then(convertToJson)
    .then((data) => {
      products = data;
    });
}
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
function addToCart(e) {
  const product = products.find((item) => item.Id === e.target.dataset.id);
  let currentItems = getLocalStorage('so-cart');
  if (currentItems != null) {
    currentItems.push(product);
    setLocalStorage('so-cart', currentItems);
  } else {
    const productList = [product];
    setLocalStorage('so-cart', productList);
  }
}

getProductsData();
// add listener to Add to Cart button
document.getElementById('addToCart').addEventListener('click', addToCart);
