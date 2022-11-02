import ExternalServices from './ExternalServices.js';
import ProductList from './productList.js';
import loadHeaderFooter from './utils.js';

const dataSource = new ExternalServices('tents', '');
const pList = new ProductList('tents', '#product-list', dataSource);
pList.init();

loadHeaderFooter();

const emails = new EmailTracker("#newsletter");


function addEmail(e) {
    const email = document.querySelector('#email');
    emails.addEmail({email: email.email});
}

document.querySelector("#submitButton").addEventListener('click', addEmail);

