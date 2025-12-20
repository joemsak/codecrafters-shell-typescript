import { print } from '../utils/io'

export const PATTERN = /^echo\s+/

export default (input: string): void => {
  const toEcho = input.replace(PATTERN, '')
  print(toEcho)
}
