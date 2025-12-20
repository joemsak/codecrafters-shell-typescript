import { createInterface } from "readline"
import { execSync } from 'child_process'

import say from './utils/say'
import resolvePath from './utils/path'

import { TYPE_PATTERN, type } from './builtins/type'
import { ECHO_PATTERN, echo } from './builtins/echo'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
})

const callback = async input => {
  const exePath = await resolvePath(input)

  switch (true) {
    case input === "exit":
      rl.close()
      return
    case TYPE_PATTERN.test(input):
      await type(rl.output, input)
      break
    case ECHO_PATTERN.test(input):
      echo(rl.output, input)
      break
    case typeof exePath !== "undefined":
      const result = execSync(input)
      rl.output.write(result)
      break
    default:
      say(rl.output, `${input}: command not found`)
  }

  rl.prompt()
}

rl.on("line", callback)

rl.prompt();
