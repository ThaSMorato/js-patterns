import Http from "http";

async function InjectHttpDecorator() {
  const oldEmit = Http.Server.prototype.emit;
  Http.Server.prototype.emit = function (...args) {
    const [type, req, res] = args;

    if (type === "request") {
      res.setHeader("X-Instrumented-By", "Thales Morato");
    }

    return oldEmit.apply(this, args);
  };
}

export { InjectHttpDecorator };
