import { createInterface } from "readline"
import { access, constants } from 'node:fs/promises'

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

const type = async input => {
  const command = input.replace(TYPE_PATTERN, "")
  const paths = process.env.PATH.split(':')

  for (const path of paths) {
    const loc = `${path}/${command}`

    try {
      await access(loc, constants.X_OK)
      console.log(`${command} is ${loc}`)
    } catch {
      continue
    }
  }

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

