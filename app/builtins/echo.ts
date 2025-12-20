import say from '../utils/say'

export const ECHO_PATTERN = /^echo\s/

export const echo = (input: string): void => {
  const toEcho = input.replace(ECHO_PATTERN, "")
  say(toEcho)
}

