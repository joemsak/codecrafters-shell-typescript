import resolvePath from '../utils/path'
import say from '../utils/say'

const BUILTINS = ['echo', 'exit', 'type'] as const

export const PATTERN = /^type\s+/

export default async (input: string): Promise<void> => {
  const exe = input.replace(PATTERN, '')

  if (BUILTINS.includes(exe as (typeof BUILTINS)[number])) {
    say(`${exe} is a shell builtin`)
    return
  }

  const path = await resolvePath(exe)

  if (path) {
    say(`${exe} is ${path}`)
  } else {
    say(`${exe}: not found`)
  }
}
