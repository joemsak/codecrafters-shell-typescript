import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const callback = input => {
  if (input === 'exit') {
    rl.close();
    return;
  }

  console.error(`${input}: command not found`);
  rl.question("$ ", callback);
};

rl.question("$ ", callback);

