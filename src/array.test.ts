import { describe, it, expect } from "vitest"
import { chunk, flatten, pickRandom } from "./array"

describe("chunk", () => {
  it("should split array into chunks of specified size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(chunk(["a", "b", "c", "d"], 3)).toEqual([["a", "b", "c"], ["d"]])
  })

  it("should handle empty arrays", () => {
    expect(chunk([], 2)).toEqual([])
  })

  it("should handle chunk size larger than array", () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]])
  })

  it("should handle chunk size of 1", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })

  it("should preserve element types", () => {
    const input = [1, "two", { three: 3 }]
    const result = chunk(input, 2)
    expect(result[0]).toEqual([1, "two"])
    expect(result[1]).toEqual([{ three: 3 }])
  })
})

describe("flatten", () => {
  it("should flatten single-level arrays", () => {
    expect(flatten([1, [2, 3], [4]])).toEqual([1, 2, 3, 4])
    expect(
      flatten([
        [1, 2],
        [3, 4],
      ]),
    ).toEqual([1, 2, 3, 4])
  })

  it("should handle empty arrays", () => {
    expect(flatten([])).toEqual([])
    expect(flatten([[]])).toEqual([])
  })

  it("should handle nested empty arrays", () => {
    expect(flatten([[], [], []])).toEqual([])
  })

  it("should handle mixed content", () => {
    expect(flatten([1, ["a", "b"], [true]])).toEqual([1, "a", "b", true])
  })

  it("should preserve order", () => {
    expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5])
  })
})

describe("pickRandom", () => {
  // Helper function to check if value is in array
  const isInArray = <T>(value: T, array: T[]): boolean => array.includes(value)

  it("should return a single element when amount is not specified", () => {
    const arr = [1, 2, 3, 4, 5]
    const result = pickRandom(arr)
    expect(isInArray(result, arr)).toBe(true)
  })

  it("should return an array of specified length", () => {
    const arr = [1, 2, 3, 4, 5]
    const result = pickRandom(arr, 3)
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(3)
    for (const item of result) {
      expect(isInArray(item, arr)).toBe(true)
    }
  })

  it("should handle empty arrays", () => {
    expect(pickRandom([], 2)).toEqual([])
  })

  it("should handle amount larger than array length", () => {
    const arr = [1, 2, 3]
    const result = pickRandom(arr, 5)
    expect(result).toHaveLength(3)
    expect(new Set(result).size).toBe(3) // Check for uniqueness
  })

  it("should return empty array when amount is 0", () => {
    expect(pickRandom([1, 2, 3], 0)).toEqual([])
  })

  it("should not modify original array", () => {
    const original = [1, 2, 3]
    const originalCopy = [...original]
    pickRandom(original, 2)
    expect(original).toEqual(originalCopy)
  })

  it("should return unique elements", () => {
    const arr = [1, 2, 3, 4, 5]
    const result = pickRandom(arr, 3)
    expect(new Set(result).size).toBe(3)
  })
})
