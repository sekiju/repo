/**
 * Extracts the file extension from a filepath.
 *
 * @param filepath - The file path to extract extension from
 * @returns The file extension without the dot, or empty string if no extension
 *
 * @example
 * ext('file.txt')     // returns 'txt'
 * ext('file')         // returns ''
 * ext('.gitignore')   // returns ''
 * ext('file.test.js') // returns 'js'
 */
export function ext(filepath: string): string {
  return filepath.slice(((filepath.lastIndexOf(".") - 1) >>> 0) + 2)
}
