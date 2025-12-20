import { stdout } from 'node:process'

export const output = stdout

export default (msg: string): void => {
  output.write(`${msg}\n`)
}
