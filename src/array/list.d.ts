/**
 * Array - type declarations.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Append `ys` to `xs` and return xs.
 */
export function append (xs: any[]): (ys: any[]) => any[];




/**
 * Drop the first `n` elements of a given array.
 * Returns array without the first `n` elements.
 */
export function drop (n: number): (arr: any[]) => any[];




/**
 * Drop the last `n` elements of a given array.
 * Returns array without the last `n` elements.
 */
export function dropLast (n: number): (arr: any[]) => any[];




/**
 * Return first element of the given array.
 */
export function head (arr: any[] | string): any | string;




/**
 * Return array without its last element.
 */
export function init (arr: any[] | string): any[] | string;




/**
 * Return last element of the given array.
 */
export function last (arr: any[] | string): any | string;




/**
 * - `range(stop)` -> array of numbers; start defaults to `0`
 * - `range(start, stop[, step])` -> array of numbers
 *
 * Return a list containing an arithmetic progression.
 * - `range(i, j)` returns `[i, i+1, i+2, ..., j-1]`.
 *
 * When step is given, it specifies the increment (or decrement).
 * For example:
 * - `range(4)` returns `[0, 1, 2, 3]`.
 *
 * Imitates Python's `range()`.
 */
export function range (...args: number[]): number[];




/**
 * Return array without its head (first element).
 */
export function tail (arr: any[] | string): any[] | string;




/**
 * Take the first `n` elements of a given array.
 */
export function take (n: number): (arr: any[]) => any[];




/**
 * Take the last `n` elements of a given array.
 */
export function takeLast (n: number): (arr: any[]) => any[];