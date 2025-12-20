import { createInterface } from 'node:readline'

import { input, output, print } from './utils/io'
import runCommand from './utils/runCommand'

import exit, { PATTERN as EXIT_PATTERN } from './builtins/exit'
import type, { PATTERN as TYPE_PATTERN } from './builtins/type'
import echo, { PATTERN as ECHO_PATTERN } from './builtins/echo'

const rl = createInterface({
  input,
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

  const found = await runCommand(input)
  if (!found) {
    print(`${input}: command not found`)
  }
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
