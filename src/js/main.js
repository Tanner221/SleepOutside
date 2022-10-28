import ExternalServices from './ExternalServices.js';
import ProductList from './productList.js';
import loadHeaderFooter from './utils.js';

const dataSource = new ExternalServices('tents', '');
const pList = new ProductList('tents', '#product-list', dataSource);
pList.init();

loadHeaderFooter();
