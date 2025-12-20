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

const handleInput = async (input: string): Promise<void> => {
  if (input === "exit" || input.startsWith("exit ")) {
    const code = parseInt(input.split(/\s+/)[1] ?? "0", 10)
    process.exit(code)
  }

  if (TYPE_PATTERN.test(input)) {
    await type(input)
    return
  }

  if (ECHO_PATTERN.test(input)) {
    echo(input)
    return
  }

  const exePath = await resolvePath(input)
  if (exePath) {
    const [cmd, ...args] = input.split(/\s+/)
    const child = spawn(cmd, args, { stdio: 'inherit' })
    await new Promise<void>((resolve) => {
      child.on('error', resolve)
      child.on('close', resolve)
    })
    return
  }

  say(`${input}: command not found`)
}

const main = async (): Promise<void> => {
  rl.prompt()

  for await (const raw of rl) {
    const input = raw.trim()
    if (input) {
      await handleInput(input)
    }
    rl.prompt()
  }
}

main()
