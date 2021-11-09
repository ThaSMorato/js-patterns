import UserFactory from "./factory/userFactory.js";

const userService = await UserFactory.createInstance();
const result = await userService.find("query");
console.log(result);
