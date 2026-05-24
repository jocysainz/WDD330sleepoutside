import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

// grab the category out of the url (e.g. ?category=tents)
const category = getParam("category");

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);
myList.init();
