import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

while(true) {
  rl.question("$ ", (answer) => {
    console.error(`${answer}: command not found`);
    rl.close();
  });
};
