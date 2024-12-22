import { describe, it, expect } from "vitest"
import { isFunction, isClass, isNullOrUndefined, isNullOrUndefinedOrEmpty, isNullOrUndefinedOrZero, isNumber, isObject } from "./check"

describe("isFunction", () => {
  it("should identify functions correctly", () => {
    expect(isFunction(() => {})).toBe(true)
    // biome-ignore lint/complexity/useArrowFunction: vitest
    expect(isFunction(function () {})).toBe(true)
    expect(isFunction(class {})).toBe(true)
    expect(isFunction(Math.max)).toBe(true)
  })

  it("should return false for non-functions", () => {
    expect(isFunction({})).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(42)).toBe(false)
    expect(isFunction("function")).toBe(false)
  })
})

describe("isClass", () => {
  it("should identify class constructors", () => {
    expect(isClass(class {})).toBe(true)
    // biome-ignore lint/complexity/useArrowFunction: vitest
    expect(isClass(function () {})).toBe(true)
    expect(isClass(Array)).toBe(true)
    expect(isClass(Object)).toBe(true)
  })

  it("should return false for non-class values", () => {
    expect(isClass(() => {})).toBe(false)
    expect(isClass(null)).toBe(false)
    expect(isClass(undefined)).toBe(false)
    expect(isClass({})).toBe(false)
    expect(isClass(42)).toBe(false)
  })
})

describe("isNullOrUndefined", () => {
  it("should identify null and undefined", () => {
    expect(isNullOrUndefined(null)).toBe(true)
    expect(isNullOrUndefined(undefined)).toBe(true)
  })

  it("should return false for other values", () => {
    expect(isNullOrUndefined(0)).toBe(false)
    expect(isNullOrUndefined("")).toBe(false)
    expect(isNullOrUndefined([])).toBe(false)
    expect(isNullOrUndefined({})).toBe(false)
    expect(isNullOrUndefined(false)).toBe(false)
  })
})

describe("isNullOrUndefinedOrEmpty", () => {
  it("should identify null, undefined, and empty values", () => {
    expect(isNullOrUndefinedOrEmpty(null)).toBe(true)
    expect(isNullOrUndefinedOrEmpty(undefined)).toBe(true)
    expect(isNullOrUndefinedOrEmpty("")).toBe(true)
    expect(isNullOrUndefinedOrEmpty([])).toBe(true)
  })

  it("should return false for non-empty values", () => {
    expect(isNullOrUndefinedOrEmpty("text")).toBe(false)
    expect(isNullOrUndefinedOrEmpty([1, 2])).toBe(false)
    expect(isNullOrUndefinedOrEmpty(0)).toBe(false)
    expect(isNullOrUndefinedOrEmpty({})).toBe(false)
  })
})

describe("isNullOrUndefinedOrZero", () => {
  it("should identify null, undefined, and zero", () => {
    expect(isNullOrUndefinedOrZero(null)).toBe(true)
    expect(isNullOrUndefinedOrZero(undefined)).toBe(true)
    expect(isNullOrUndefinedOrZero(0)).toBe(true)
  })

  it("should return false for other values", () => {
    expect(isNullOrUndefinedOrZero(1)).toBe(false)
    expect(isNullOrUndefinedOrZero("")).toBe(false)
    expect(isNullOrUndefinedOrZero([])).toBe(false)
    expect(isNullOrUndefinedOrZero({})).toBe(false)
    expect(isNullOrUndefinedOrZero(false)).toBe(false)
  })
})

describe("isNumber", () => {
  it("should identify valid numbers", () => {
    expect(isNumber(42)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-1)).toBe(true)
    expect(isNumber(3.14)).toBe(true)
  })

  it("should handle string numbers", () => {
    expect(isNumber("42")).toBe(true)
    expect(isNumber("3.14")).toBe(true)
    expect(isNumber("-1")).toBe(true)
  })

  it("should return false for invalid numbers", () => {
    // biome-ignore lint/style/useNumberNamespace: vitest
    expect(isNumber(NaN)).toBe(false)
    // biome-ignore lint/style/useNumberNamespace: vitest
    expect(isNumber(Infinity)).toBe(false)
    // biome-ignore lint/style/useNumberNamespace: vitest
    expect(isNumber(-Infinity)).toBe(false)
    expect(isNumber("abc")).toBe(false)
    expect(isNumber("12px")).toBe(false)
  })

  it("should return false for non-number values", () => {
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber(() => {})).toBe(false)
  })
})

describe("isObject", () => {
  it("should identify plain objects", () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it("should handle constructor type checking", () => {
    expect(isObject([], Array)).toBe(true)
    expect(isObject(new Date(), Date)).toBe(true)
    expect(isObject(new Map(), Map)).toBe(true)
    expect(isObject(new Set(), Set)).toBe(true)
  })

  it("should return false for mismatched constructors", () => {
    expect(isObject([], Object)).toBe(false)
    expect(isObject(new Date(), Array)).toBe(false)
    expect(isObject({}, Array)).toBe(false)
  })

  it("should return false for non-objects", () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(42)).toBe(false)
    expect(isObject("string")).toBe(false)
    expect(isObject(() => {})).toBe(false)
  })
})
