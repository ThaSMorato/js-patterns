const { expect } = require("chai");
const { it, describe } = require("mocha");

const { productValidator } = require("./../src");
const ProductMotherObject = require("./model/productMotherObject");

describe("Test Product Mother", () => {
  it("shouldnt return error with valid product", () => {
    const product = ProductMotherObject.valid();

    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expected);
  });

  describe("Product validation rules", () => {
    it("should return an object error when creating a product with invalid id", () => {
      const product = ProductMotherObject.withInvalidId();

      const result = productValidator(product);

      const expected = {
        errors: [
          `id: invalid length, current [${product.id.length}] expected to be between 2 and 20`,
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a product with invalid name", () => {
      const product = ProductMotherObject.withInvalidName();

      const result = productValidator(product);

      const expected = {
        errors: [`name: invalid value, current [${product.name}] expected to have only words`],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a product with invalid price", () => {
      const product = ProductMotherObject.withInvalidPrice();

      const result = productValidator(product);

      const expected = {
        errors: [
          `price: invalid valur, current [${product.price}] expected to be between 1 and 1000`,
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a product with invalid category", () => {
      const product = ProductMotherObject.withInvalidCategory();

      const result = productValidator(product);

      const expected = {
        errors: [
          `category: invalid value, current [${product.category}] expected to be either organic or electronic`,
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
  });
});
