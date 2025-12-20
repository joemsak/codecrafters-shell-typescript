import { createInterface } from 'node:readline'

import { input, output, print } from './utils/io'
import runCommand from './utils/runCommand'

import echo, { PATTERN as ECHO_PATTERN } from './builtins/echo'
import exit, { PATTERN as EXIT_PATTERN } from './builtins/exit'
import pwd, { PATTERN as PWD_PATTERN } from './builtins/pwd'
import type, { PATTERN as TYPE_PATTERN } from './builtins/type'

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

  if (PWD_PATTERN.test(input)) {
    pwd()
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
