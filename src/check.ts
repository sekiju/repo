import type { Constructor, Ctor, NonNullObject, Nullish } from "./types"

/**
 * Checks if a value is a function.
 *
 * @param input - Value to check
 * @returns True if the input is a function, false otherwise
 *
 * @example
 * isFunction(() => {})     // returns true
 * isFunction(class {})     // returns true
 * isFunction({})           // returns false
 */
export function isFunction(input: unknown): input is Function {
  return typeof input === "function"
}

/**
 * Checks if a value is a class constructor.
 *
 * @param input - Value to check
 * @returns True if the input is a class constructor, false otherwise
 *
 * @example
 * isClass(class {})        // returns true
 * isClass(function() {})   // returns true
 * isClass(() => {})       // returns false
 */
export function isClass(input: unknown): input is Ctor {
  return typeof input === "function" && typeof input.prototype === "object"
}

/**
 * Checks if a value is null or undefined.
 *
 * @param value - Value to check
 * @returns True if the value is null or undefined, false otherwise
 *
 * @example
 * isNullOrUndefined(null)      // returns true
 * isNullOrUndefined(undefined) // returns true
 * isNullOrUndefined(0)         // returns false
 */
export function isNullOrUndefined(value: unknown): value is Nullish {
  return value === undefined || value === null
}

/**
 * Checks if a value is null, undefined, or an empty string/array.
 *
 * @param value - Value to check
 * @returns True if the value is null, undefined, or empty, false otherwise
 *
 * @example
 * isNullOrUndefinedOrEmpty("")         // returns true
 * isNullOrUndefinedOrEmpty([])         // returns true
 * isNullOrUndefinedOrEmpty(null)       // returns true
 * isNullOrUndefinedOrEmpty("text")     // returns false
 */
export function isNullOrUndefinedOrEmpty(value: unknown): value is Nullish | "" {
  return isNullOrUndefined(value) || (value as string | unknown[]).length === 0
}

/**
 * Checks if a value is null, undefined, or zero.
 *
 * @param value - Value to check
 * @returns True if the value is null, undefined, or zero, false otherwise
 *
 * @example
 * isNullOrUndefinedOrZero(0)          // returns true
 * isNullOrUndefinedOrZero(null)       // returns true
 * isNullOrUndefinedOrZero(undefined)  // returns true
 * isNullOrUndefinedOrZero(1)          // returns false
 */
export function isNullOrUndefinedOrZero(value: unknown): value is Nullish | 0 {
  return value === 0 || isNullOrUndefined(value)
}

/**
 * Checks if a value is a valid number.
 * Converts string numbers to numbers before checking.
 * Excludes NaN and Infinity.
 *
 * @param input - Value to check
 * @returns True if the input is a valid number, false otherwise
 *
 * @example
 * isNumber(123)           // returns true
 * isNumber("123")         // returns true
 * isNumber(NaN)           // returns false
 * isNumber(Infinity)      // returns false
 */
export function isNumber(input: unknown): input is number {
  if (typeof input === "string") input = Number(input)
  return typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)
}

/**
 * Checks if a value is an object of a specific constructor type.
 * If no constructor is provided, checks if the value is a plain object.
 *
 * @param input - Value to check
 * @param constructorType - Optional constructor type to check against
 * @returns True if the input matches the constructor type, false otherwise
 *
 * @example
 * isObject({})                    // returns true
 * isObject([], Array)             // returns true
 * isObject(new Date(), Date)      // returns true
 * isObject(null)                  // returns false
 */
export function isObject(input: unknown, constructorType?: ObjectConstructor): input is NonNullObject
export function isObject<T extends Constructor<unknown>>(input: unknown, constructorType: T): input is InstanceType<T>
export function isObject<T extends Constructor<unknown> = ObjectConstructor>(input: unknown, constructorType?: T): input is NonNullObject {
  return typeof input === "object" && input ? input.constructor === (constructorType ?? Object) : false
}

export { isNullOrUndefined as isNullish, isNullOrUndefinedOrEmpty as isNullishOrEmpty, isNullOrUndefinedOrZero as isNullishOrZero }
