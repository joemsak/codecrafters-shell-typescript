import { cwd } from 'node:process'

import { print } from '../utils/io'

export const PATTERN = /^pwd\s*/

export default (): void => {
  print(cwd())
}
