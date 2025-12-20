import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const callback = (answer) => {
  console.error(`${answer}: command not found`);
  rl.question("$ ", callback);
});

rl.question("$ ", callback);

