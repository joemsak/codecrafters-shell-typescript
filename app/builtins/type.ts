const BUILTINS = ["echo", "exit", "type"]

export const TYPE_PATTERN = /^type\s/

export const type = async input => {
  const exe = input.replace(TYPE_PATTERN, "")

  if (BUILTINS.includes(exe)) {
    say(`${exe} is a shell builtin`)
    return
  }

  const path = await resolvePath(exe);

  if (path) {
    say(`${exe} is ${path}`)
  } else {
    say(`${exe}: not found`)
  }
}

