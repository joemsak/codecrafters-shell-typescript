import { print } from '../utils/io'

export const PATTERN = /^echo\s+/

export default (msg: string): void => {
  print(msg)
}
