export const ECHO_PATTERN = /^echo\s/

export const echo = input => {
  const toEcho = input.replace(ECHO_PATTERN, "")
  say(toEcho)
}

