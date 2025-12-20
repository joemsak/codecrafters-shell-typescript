import { createInterface } from 'node:readline'

import { input, output, print } from './utils/io'
import runCommand from './utils/runCommand'

import cd, { PATTERN as CD_PATTERN } from './builtins/cd'
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
    const code = parseInt(input.split(/\s+/)[1] ?? '0', 10)
    exit(code)
  }

  if (TYPE_PATTERN.test(input)) {
    const cmd = input.replace(TYPE_PATTERN, '')
    await type(cmd)
    return
  }

  if (ECHO_PATTERN.test(input)) {
    const msg = input.replace(ECHO_PATTERN, '')
    echo(msg)
    return
  }

  if (PWD_PATTERN.test(input)) {
    pwd()
    return
  }

  if (CD_PATTERN.test(input)) {
    const path = input.replace(CD_PATTERN, '')
    cd(path)
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
