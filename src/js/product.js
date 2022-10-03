import ProductData from './productData.js';
import ProductDetails from './productDetails.js';
//import { getParam } from './utils.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');
const productId = urlParams.get('id');

const dataSource = new ProductData(category, productId);
const product = new ProductDetails(productId, dataSource);
product.init();


// const dataSource = new ProductData(category, id);

// const product1 = dataSource.getProduct();
// product1.then((event)=>console.log(event))

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

export default function getLocalStorage(key) {
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
// function addToCart(e) {
//   const product = products.find((item) => item.Id === e.target.dataset.id);
//   let currentItems = getLocalStorage('so-cart');
//   if (currentItems != null) {
//     currentItems.push(product);
//     setLocalStorage('so-cart', currentItems);
//   } else {
//     const productList = [product];
//     setLocalStorage('so-cart', productList);
//   }
// }

getProductsData();
// add listener to Add to Cart button
// document.getElementById('addToCart').addEventListener('click', addToCart);
