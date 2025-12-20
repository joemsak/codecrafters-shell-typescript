export const PATTERN = /^exit(\s|$)/

export default (code: integer): never => {
  process.exit(code)
}
