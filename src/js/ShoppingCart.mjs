import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

// template for a single cart item
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
  constructor(key, listElement) {
    // key is what we look up in localStorage (so-cart)
    // listElement is where the cart items get rendered
    this.key = key;
    this.listElement = listElement;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    // if the cart is empty, dont try to render anything
    if (!cartItems) return;
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems);
  }
}