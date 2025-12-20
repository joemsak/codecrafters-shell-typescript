import { createInterface } from 'node:readline'
import { spawn } from 'node:child_process'

import say, { output } from './utils/io'
import findExecutable from './utils/findExecutable'

import exit, { PATTERN as EXIT_PATTERN } from './builtins/exit'
import type, { PATTERN as TYPE_PATTERN } from './builtins/type'
import echo, { PATTERN as ECHO_PATTERN } from './builtins/echo'

const rl = createInterface({
  input: process.stdin,
  output,
  prompt: '$ ',
})

const handleInput = async (input: string): Promise<void> => {
  if (EXIT_PATTERN.test(input)) {
    exit(input)
  }

  if (TYPE_PATTERN.test(input)) {
    await type(input)
    return
  }

  if (ECHO_PATTERN.test(input)) {
    echo(input)
    return
  }

  const exePath = await findExecutable(input)
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
