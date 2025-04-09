const { setTimeout } = require("timers/promises");
const apm = require("elastic-apm-node").start({ serviceName: "example" });

const asyncFunction = async () => {
  const span = apm.startSpan("First span", { exitSpan: true });
  await setTimeout(5);
  span.end();
};

const run = async () => {
  apm.startTransaction("Not working transaction");
  await asyncFunction();

  const span = apm.startSpan("Second span"); // Span is not created.
  console.log({ span }); // Span is null.
  await setTimeout(5);
  span?.end();
  apm.endTransaction();
};

run();
