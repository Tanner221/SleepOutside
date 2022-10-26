// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(parameter){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameter);
}

export function shake(){

 const cartElement = document.querySelector('.cart');
 const cartItems = getLocalStorage('so-cart');
 if (cartItems != null){
 cartElement.classList.add('shakeanimation');
document.querySelector('.badge').innerHTML = cartItems.length
}
}

export function renderWithTemplate(data, template, parent, callback) {
  let clone = template.content.cloneNode(true);
  //prep template
  if (callback) {
    clone = callback(clone, data);
  }
  // insert the actual details of the current product into the template
  parent.appendChild(clone);
}

function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error('Bad Response');
  }
}
export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}
export default async function loadHeaderFooter() {
  const loadHead = await loadTemplate('/partials/header.html');
  const loadFoot = await loadTemplate('/partials/footer.html');
  const head = document.getElementById('main-header');
  const foot = document.getElementById('main-footer');

  console.log(loadHead);

  renderWithTemplate({}, loadHead, head);
  renderWithTemplate({}, loadFoot, foot);
}
