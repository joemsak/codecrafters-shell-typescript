import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const respond = (answer) => {
  console.error(`${answer}: command not found`);
  rl.close();
  rl.question("$ ", respond);
});

rl.question("$ ", respond);

