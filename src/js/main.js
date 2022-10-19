import ProductData from "./productData.js";
import ProductList from "./productList.js";
import loadHeaderFooter from "./utils.js";

const dataSource = new ProductData("tents", "");
const pList = new ProductList("tents", "#product-list", dataSource);
pList.init();

loadHeaderFooter();
