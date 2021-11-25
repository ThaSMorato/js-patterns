import { expect, test, jest, describe, beforeEach, afterEach } from "@jest/globals";
import { OrderBusiness } from "../src/business/orderBusiness";
import { Order } from "../src/entities/order";

describe("Test suite for Template Method design pattern", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("#OrderBusiness", () => {
    test("executing Order business without template method", () => {
      const order = new Order({
        customerId: 1,
        amount: 100.0,
        products: [{ description: "Ferrari" }],
      });

      const orderBusiness = new OrderBusiness();
      const isValid = orderBusiness._validateRequiredFields(order);

      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);

      expect(result).toBeTruthy();
    });

    test("executing Order business with template method", () => {
      const order = new Order({
        customerId: 1,
        amount: 100.0,
        products: [{ description: "Ferrari" }],
      });

      const orderBusiness = new OrderBusiness();

      const calledValidationsFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      );
      const calledCreationFn = jest.spyOn(orderBusiness, orderBusiness._create.name);

      const result = orderBusiness.create(order);

      expect(result).toBeTruthy();
      expect(calledValidationsFn).toBeCalled();
      expect(calledCreationFn).toBeCalled();
    });
  });
});
