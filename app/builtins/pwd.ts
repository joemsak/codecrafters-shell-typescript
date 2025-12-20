import { print } from '../utils/io'

export const PATTERN = /^pwd\s*/

export default (): void => {
  print(process.cwd())
}
