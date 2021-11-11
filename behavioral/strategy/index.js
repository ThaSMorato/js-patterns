import { ContextStrategy } from "./src/base/contextStrategy.js";
import { MongoDBStrategy } from "./src/strategies/mongoDbStrategy.js";
import { PostgresStrategy } from "./src/strategies/postgresStrategy.js";

const postgresConnectionString = "postgres://thalesmorato:senha123@localhost:5432/heroes";
const mongoDBConnectionString = "mongodb://thalesmorato:senha123@localhost:27017/heroes";

const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));

const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString));

await postgresContext.connect();
await mongoDBContext.connect();

const data = [
  {
    name: "thales",
    type: "transaction",
  },
  {
    name: "johndoe",
    type: "activityLog",
  },
];

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
};

for (const { type, name } of data) {
  const context = contextTypes[type];
  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read());
}
