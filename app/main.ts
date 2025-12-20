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
  switch (input) {
    case 'exit':
      rl.close()
      return
    case ECHO_PATTERN:
      echo(input)
      break
    default:
      console.error(`${input}: command not found`)
  }

  rl.question("$ ", callback)
}

rl.question("$ ", callback)

