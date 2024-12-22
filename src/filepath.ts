/**
 * Extracts the file extension from a filepath.
 *
 * @param filepath - The file path to extract extension from
 * @returns The file extension without the dot, or undefined if no extension
 *
 * @example
 * ext('file.txt')     // returns 'txt'
 * ext('file')         // returns undefined
 * ext('.gitignore')   // returns undefined
 * ext('file.test.js') // returns 'js'
 */
export function ext(filepath: string): string | undefined {
  const index = filepath.lastIndexOf(".")
  if (index <= 0 || index === filepath.length - 1) return undefined
  return filepath.slice(index + 1)
}
