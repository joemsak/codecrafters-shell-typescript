import { createInterface } from "readline"

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const echo = input => {
  console.log(`${input.replace("echo ", "")}\n`)
}

const callback = input => {
  if (input === 'exit') {
    rl.close()
    return
  }

  if (input.match(/^echo\s/)) {
    echo(input)
  } else {
    console.error(`${input}: command not found`)
  }

  rl.question("$ ", callback)
}

rl.question("$ ", callback)

