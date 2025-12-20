import say from '../utils/say'

export const ECHO_PATTERN = /^echo\s/

export const echo = output, input => {
  const toEcho = input.replace(ECHO_PATTERN, "")
  say(output, toEcho)
}

