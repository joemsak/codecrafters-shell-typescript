import { stdout } from 'node:process'

export const output = stdout

export const print = (msg: string): void => {
  output.write(`${msg}\n`)
}
