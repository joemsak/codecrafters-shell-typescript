import { stdin, stdout } from 'node:process'

export const input = stdin
export const output = stdout

export const print = (msg: string): void => {
  output.write(`${msg}\n`)
}
