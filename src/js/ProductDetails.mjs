import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);

    // --- NEW ANIMATION CODE ---
    // 1. Find the backpack SVG icon
    const cartIcon = document.querySelector(".cart svg");
    
    // 2. Add the animation class to make it bounce
    cartIcon.classList.add("cart-bump");
    
    // 3. Remove the class after half a second so it can bounce again next time
    setTimeout(() => {
        cartIcon.classList.remove("cart-bump");
    }, 500);
  }

  renderProductDetails() {
    document.querySelector(".product__brand").textContent = this.product.Brand.Name;
    document.querySelector(".product__name").textContent = this.product.NameWithoutBrand;
    document.querySelector(".product__image").src = this.product.Images.PrimaryLarge;
    document.querySelector(".product__image").alt = this.product.NameWithoutBrand;
    document.querySelector(".product__price").textContent = `$${this.product.FinalPrice}`;
    document.querySelector(".product__color").textContent = this.product.Colors[0].ColorName;
    document.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = this.product.Id;
  }
}