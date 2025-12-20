import { createInterface } from "readline"
import { spawn } from 'child_process'

import say, { output } from './utils/say'
import resolvePath from './utils/path'

import type, { PATTERN as TYPE_PATTERN } from './builtins/type'
import echo, { PATTERN as ECHO_PATTERN } from './builtins/echo'

const rl = createInterface({
  input: process.stdin,
  output,
  prompt: "$ ",
})

const callback = async (input: string): Promise<void> => {
  const exePath = await resolvePath(input)

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
    case exePath !== undefined:
      const [cmd, ...args] = input.split(/\s+/)
      const child = spawn(cmd, args, { stdio: 'inherit' })
      await new Promise<void>(resolve => child.on('close', resolve))
      break
    default:
      say(`${input}: command not found`)
  }

  rl.prompt()
}

rl.on("line", callback)

rl.prompt();
