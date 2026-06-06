import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(this.outputSelector + " #summary-subtotal");
    this.itemTotal = 0;
    
    if (this.list && this.list.length > 0) {
      const amounts = this.list.map((item) => item.FinalPrice);
      this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    }

    if (summaryElement) {
      summaryElement.innerText = this.itemTotal.toFixed(2);
    }
  }

  calculateOrdertotal() {
    this.shipping = 0;
    if (this.list && this.list.length > 0) {
      this.shipping = 10 + (this.list.length - 1) * 2;
    }

    this.tax = (this.itemTotal * 0.06);
    this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax));

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shippingElement = document.querySelector(this.outputSelector + " #summary-shipping");
    const taxElement = document.querySelector(this.outputSelector + " #summary-tax");
    const orderTotalElement = document.querySelector(this.outputSelector + " #summary-total");

    if (shippingElement) shippingElement.innerText = this.shipping.toFixed(2);
    if (taxElement) taxElement.innerText = this.tax.toFixed(2);
    if (orderTotalElement) orderTotalElement.innerText = this.orderTotal.toFixed(2);
  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1, 
    }));
  }

  async checkout(form) {
    const json = formDataToJSON(form);
    
    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal.toFixed(2);
    json.tax = this.tax.toFixed(2);
    json.shipping = this.shipping;
    json.items = this.packageItems(this.list);

    try {
      const res = await services.checkout(json);
      // eslint-disable-next-line no-console
      console.log("Order Successful:", res);
    
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("Order Failed:", err);
    }
  }
}