import { createInterface } from "readline"

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const ECHO_PATTERN = /^echo\s/

const echo = input => {
  const toEcho = input.replace(ECHO_PATTERN, "")
  console.log(`${toEcho}\n`)
}

const callback = input => {
  switch (true) {
    case input === "exit":
      rl.close()
      return
    case ECHO_PATTERN.test(input):
      echo(input)
    default:
      console.error(`${input}: command not found`)
  }

  rl.question("$ ", callback)
}

rl.question("$ ", callback)

