/**
 * Array - type declarations.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Simple array flattener.
 */
export declare function flatten (arr: unknown[][]): unknown[];




/**
 * Checks if a given array is a continuous block.
 */
export declare function isContinuous<T> (
    arr: T[]
): boolean;
export declare function isContinuous<T extends (number | bigint)> (
    arr: T[],
    neighbour: (a: T, b: T) => boolean
): boolean;




/**
 * Checks if a given array is sorted.
 */
export declare function isSorted<T> (
    arr: T[]
): boolean;
export declare function isSorted<T> (
    arr: T[],
    cmp: (a: T, b: T) => boolean
): boolean;




/**
 * Take every `nth` element from an `arr` array.
 */
export declare function takeEvery (
    nth: number
): (arr: unknown[]) => unknown[];




/**
 * Zip given arrays using provided `f` operator.
 *
 * Example:
 *
 * ```
 * array.zipWith((a, b) => a + b) ([1, 2, 3, 4], [10, 20, 30, 40])
 * [ 11, 22, 33, 44 ]
 * ```
 */
export declare function zipWith<T> (
    f: (...args: unknown[]) => T
): (...arrs: unknown[][]) => T[];




/**
 * Zip given arrays.
 *
 * Example:
 *
 * ```
 * zip([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"])
 * [ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ], [ 4, 'd' ], [ 5, 'e' ] ]
 * ```
 */
export declare function zip (...arrs: unknown[][]): unknown[][];
