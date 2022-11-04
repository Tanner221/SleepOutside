import ExternalServices from './ExternalServices.js';
import ProductList from './productList.js';
import loadHeaderFooter, { getParam } from './utils.js';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ExternalServices(category, '');
const pList = new ProductList(category, '#product-list1', dataSource);


function setThisToFilterByName() {
    pList.filterByName.call(pList);
}

function setThisToFilterByPrice() {
    pList.filterByPrice.call(pList);
}
document.getElementById('filter-name').addEventListener('click', setThisToFilterByName);
document.getElementById('filter-price').addEventListener('click', setThisToFilterByPrice);
pList.init();


var modal = document.getElementById('myModal');
pList.listElement.addEventListener('click', (e) => {
    if(e.target.type === 'submit') {
        e.preventDefault();
        const product = pList.getProductById(e.target.dataset.id);
        console.log(product);
        document.querySelector('.modal__img').src = product.Images.PrimaryMedium;
        document.querySelector('.modal__brand').innerHTML = product.Brand.Name;
        document.querySelector('.modal__name').innerHTML = product.Name;
        modal.style.display = 'block';
    }
});

const closeBtn = document.getElementById('btn-close-modal');
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
})


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
