import resolvePath from '../utils/path'
import say from '../utils/say'

const BUILTINS = ["echo", "exit", "type"]

export const TYPE_PATTERN = /^type\s/

export const type = async output, input => {
  const exe = input.replace(TYPE_PATTERN, "")

  if (BUILTINS.includes(exe)) {
    say(output, `${exe} is a shell builtin`)
    return
  }

  const path = await resolvePath(exe);

  if (path) {
    say(output, `${exe} is ${path}`)
  } else {
    say(output, `${exe}: not found`)
  }
}

