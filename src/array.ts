/**
 * Splits an array into smaller chunks of specified size.
 *
 * @param array - The array to split into chunks
 * @param size - The size of each chunk
 * @returns An array of chunks, where each chunk is an array of size elements
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // returns [[1, 2], [3, 4], [5]]
 * chunk(['a', 'b', 'c'], 2)  // returns [['a', 'b'], ['c']]
 */
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size))
}

/**
 * Flattens a nested array structure into a single-level array.
 * Supports single-level and multi-level arrays.
 *
 * @param array - The array to flatten
 * @returns A new flattened array
 *
 * @example
 * flatten([1, [2, 3], [4]]) // returns [1, 2, 3, 4]
 * flatten([[1, 2], [3, 4]]) // returns [1, 2, 3, 4]
 */
export function flatten<T>(array: readonly T[]): T[]
export function flatten<T>(array: readonly T[][]): T[] {
  return array.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), [])
}

/**
 * Picks one or more random elements from an array.
 * If amount is 1 or undefined, returns a single element.
 * If amount is greater than 1, returns an array of elements.
 *
 * The function modifies a copy of the input array, not the original.
 * Selected elements are guaranteed to be unique (no duplicates).
 *
 * @param array - The array to pick elements from
 * @param amount - Number of elements to pick (default: 1)
 * @returns A single element if amount is 1, otherwise an array of elements
 *
 * @example
 * pickRandom([1, 2, 3])    // returns a single random number
 * pickRandom([1, 2, 3], 2) // returns array of 2 random numbers
 */
export function pickRandom<T>(array: readonly T[], amount?: 1): T
export function pickRandom<T>(array: readonly T[], amount: number): T[]
export function pickRandom<T>(array: readonly T[], amount = 1): T | T[] {
  const arr = [...array]
  if (typeof amount === "undefined" || amount === 1) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  if (!arr.length || !amount) {
    return []
  }

  return Array.from({ length: Math.min(amount, arr.length) }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0])
}
