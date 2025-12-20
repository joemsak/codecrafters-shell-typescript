import { access, constants } from 'node:fs/promises'

const PATHS = process.env.PATH.split(':')

export default async command => {
  const exe = command.replace(/\s[\w\s]+$/, "")

  for (const path of PATHS) {
    const loc = `${path}/${exe}`

    try {
      await access(loc, constants.X_OK)
      return loc;
    } catch {
      continue
    }
  }
}

