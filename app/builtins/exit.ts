export const PATTERN = /^exit(\s|$)/

export default (input: string): never => {
  const code = parseInt(input.split(/\s+/)[1] ?? '0', 10)
  process.exit(code)
}
