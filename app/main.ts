import { createInterface } from "readline"
import { access, constants } from 'node:fs/promises'
import { exec } from 'child_process'

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
  const exe = input.replace(TYPE_PATTERN, "")

  if (BUILTINS.includes(exe)) {
    console.log(`${exe} is a shell builtin`)
    return
  }

  const path = getPath(exe);

  if (path) {
    console.log(`${exe} is ${path}`)
  } else {
    console.error(`${exe}: not found`)
  }
}

const getPath = async command => {
  const exe = command.replace(/\s\w+$/)

  for (const path of PATHS) {
    const loc = `${path}/${exe}`

    try {
      await access(loc, constants.X_OK)
      return loc;
    } catch {
      continue
    }
  }
}

const callback = async input => {
  const exePath = getPath(input)

  switch (true) {
    case input === "exit":
      rl.close()
      return
    case TYPE_PATTERN.test(input):
      await type(input)
      break
    case ECHO_PATTERN.test(input):
      echo(exePath, input)
      break
    case exePath !== undefined:
      exec(input)
      break
    default:
      console.error(`${input}: command not found`)
  }

  rl.question("$ ", callback)
}

rl.question("$ ", callback)

