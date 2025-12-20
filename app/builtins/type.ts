import findExecutable from '../utils/findExecutable'
import { print } from '../utils/io'

const BUILTINS = ['echo', 'exit', 'pwd', 'type'] as const

export const PATTERN = /^type\s+/

export default async (input: string): Promise<void> => {
  const exe = input.replace(PATTERN, '')

  if (BUILTINS.includes(exe as (typeof BUILTINS)[number])) {
    print(`${exe} is a shell builtin`)
    return
  }

  const path = await findExecutable(exe)

  if (path) {
    print(`${exe} is ${path}`)
  } else {
    print(`${exe}: not found`)
  }
}
