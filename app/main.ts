import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("$ ", (answer) => {
  while(true) {
    console.error(`${answer}: command not found`);
    rl.close();
  }
});
