import ProductData from './productData.js';
import ProductList from './productList.js';
import loadHeaderFooter, { getParam } from './utils.js';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData(category, '');
const pList = new ProductList(category, '#product-list1', dataSource);
pList.init();
