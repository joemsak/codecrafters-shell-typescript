import { createInterface } from "readline"
import { access, constants } from 'node:fs/promises'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const PATHS = process.env.PATH.split(':')
const BUILTINS = ["echo", "exit", "type"]

const ECHO_PATTERN = /^echo\s/
const TYPE_PATTERN = /^type\s/

const echo = input => {
  const toEcho = input.replace(ECHO_PATTERN, "")
  console.log(toEcho)
}

const type = async input => {
  const command = input.replace(TYPE_PATTERN, "")

  if (BUILTINS.includes(command)) {
    console.log(`${command} is a shell builtin`)
    return
  }

  const path = getPath(command);

  if (path) {
    console.log(`${command} is ${path}`)
  } else {
    console.error(`${command}: not found`)
  }
}

const getPath = async command => {
  for (const path of PATHS) {
    const loc = `${path}/${command}`

    try {
      await access(loc, constants.X_OK)
      return loc;
    } catch {
      continue
    }
  }
}

const callback = async input => {
  switch (true) {
    case input === "exit":
      rl.close()
      return
    case TYPE_PATTERN.test(input):
      await type(input)
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

