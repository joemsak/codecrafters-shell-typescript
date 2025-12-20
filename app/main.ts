import { createInterface } from "readline"

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const BUILTINS = ["echo", "exit", "type"]

const ECHO_PATTERN = /^echo\s/
const TYPE_PATTERN = /^type\s/

const echo = input => {
  const toEcho = input.replace(ECHO_PATTERN, "")
  console.log(toEcho)
}

const type = input => {
  const command = input.replace(TYPE_PATTERN, "")

  if (BUILTINS.includes(command)) {
    console.log(`${command} is a shell builtin`)
  } else {
    console.error(`${command}: not found`)
  }
}

const callback = input => {
  switch (true) {
    case input === "exit":
      rl.close()
      return
    case TYPE_PATTERN.test(input):
      type(input)
      break
    case ECHO_PATTERN.test(input):
      echo(input)
      break
    default:
      console.error(`${input}: command not found`)
  }

  rl.question("$ ", callback)
}

rl.question("$ ", callback)

