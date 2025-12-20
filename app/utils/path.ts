import { access, constants } from 'node:fs/promises'
import { join, delimiter } from 'node:path'

const PATHS = (process.env.PATH ?? '').split(delimiter)

export default async (command: string): Promise<string | undefined> => {
  const exe = command.replace(/\s[\w\s]+$/, "")

  for (const dir of PATHS) {
    const loc = join(dir, exe)

    try {
      await access(loc, constants.X_OK)
      return loc
    } catch {
      continue
    }
  }
}

