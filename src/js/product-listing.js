import ProductData from './productData.js';
import ProductList from './productList.js';
import loadHeaderFooter, { getParam } from './utils.js';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData(category, '');
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
