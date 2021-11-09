const Product = require("../../src/entities/product");

class ProductDataBuilder {
  constructor() {
    this.productData = {
      id: "0001",
      name: "computer",
      price: 1000,
      category: "electronic",
    };
  }

  static aProduct() {
    return new ProductDataBuilder();
  }

  withInvalidId() {
    this.productData.id = "";

    return this;
  }

  withInvalidName() {
    this.productData.name = "abc123";

    return this;
  }

  withInvalidPrice() {
    this.productData.price = 2000;

    return this;
  }

  withInvalidCategory() {
    this.productData.category = "mecanic";

    return this;
  }

  build() {
    const product = new Product(this.productData);

    return product;
  }
}

module.exports = ProductDataBuilder;
