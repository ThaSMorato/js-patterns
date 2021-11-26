import http from "http";
import { InjectHttpDecorator } from "../index.js";
InjectHttpDecorator();

function handleRequest(req, res) {
  //res.setHeader('X-Instrumented-By', 'Thales Morato');
  res.end("Hello world");
}

const server = http.createServer(handleRequest);
const port = 3000;
server.listen(port, () => console.log(`listening on port ${port}`));
