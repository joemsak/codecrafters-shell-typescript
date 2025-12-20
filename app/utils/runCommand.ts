import { spawn } from 'node:child_process'
import findExecutable from './findExecutable'

export default async (input: string): Promise<boolean> => {
  const exePath = await findExecutable(input)
  if (!exePath) {
    return false
  }

  const [cmd, ...args] = input.split(/\s+/)
  const child = spawn(cmd, args, { stdio: 'inherit' })
  await new Promise<void>((resolve) => {
    child.on('error', resolve)
    child.on('close', resolve)
  })
  return true
}
