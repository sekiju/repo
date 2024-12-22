import type { Constructor, Ctor, NonNullObject } from "./types"

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

