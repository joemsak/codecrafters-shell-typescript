import { chdir } from 'node:process'

import { print } from '../utils/io'

export const PATTERN = /^cd\s+/

export default (path: string): void => {
  try {
    chdir(path)
  } catch(err) {
    if (/no such file/.test(err))
      print(`cd: ${path}: No such file or directory`)
    else
      print(err)
  } 
}
