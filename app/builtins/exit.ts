import { exit } from 'node:process'

export const PATTERN = /^exit(\s|$)/

export default (code: integer): never => {
  exit(code)
}
