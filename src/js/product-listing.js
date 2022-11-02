import ExternalServices from './ExternalServices.js';
import ProductList from './productList.js';
import loadHeaderFooter, { getParam } from './utils.js';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ExternalServices(category, '');
const pList = new ProductList(category, '#product-list1', dataSource);
pList.init();
