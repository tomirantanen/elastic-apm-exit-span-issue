const { setTimeout } = require("timers/promises");
const apm = require("elastic-apm-node").start({ serviceName: "example" });

const notAsyncFunction = () => {
  const span = apm.startSpan("First span", { exitSpan: true });
  span.end();
};

const run = async () => {
  apm.startTransaction("Working transaction");
  notAsyncFunction();

  const span = apm.startSpan("Second span"); // Span is created normally.
  console.log({ span });
  await setTimeout(5);
  span?.end();
  apm.endTransaction();
};

run();
