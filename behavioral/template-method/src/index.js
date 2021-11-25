import { OrderBusiness } from "./business/orderBusiness.js";
import { Order } from "./entities/order.js";

const order = new Order({
  customerId: "asd123",
  amount: 200.0,
  products: [{ description: "Car" }],
});

const orderBusiness = new OrderBusiness();

console.log("order created", orderBusiness.create(order));
