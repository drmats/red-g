/**
 * Javascript toolbox - type declarations.
 *
 * @module @xcmats/js-toolbox
 * @license Apache-2.0
 * @author drmats
 */




declare module "@xcmats/js-toolbox" {




    /**
     * @namespace array
     * @see {@link module:array}
     */
    export namespace array {

        /**
         * Create object composed of keys resulting from application
         * of `iteratee` function to each element of the passed array `arr`.
         * Values corresponds to the number of occurences of an element
         * in the passed array.
         *
         * `iteratee` is optional and defaults to `identity` function.
         *
         * Example:
         *
         * ```
         * countBy(
         *     "exemplo plus quam ratione vivimus".split(" "),
         *     (w) => w.length
         * )
         * ```
         */
        export function countBy (
            arr: any[], iteratee?: (el: any) => (any)
        ): object;


        /**
         * Choose a random element from a non-empty array.
         */
        export function draw (arr: any[] | string): any | string;


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
         * Find duplicates in a given array.
         *
         * Optionally, before comparision, each element is transformed by
         * `iteratee` function (which defaults to `identity`).
         *
         * Example:
         *
         * ```
         * findDuplicates(["one", "two", "one", "three", "six", "two", "two"])
         * ```
         */
        export function findDuplicates (
            arr: any[],
            iteratee?: (el: any) => (any)
        ): string[];


        /**
         * Simple array flattener.
         */
        export function flatten (arr: any[][]): any[];


        /**
         * Return first element of the given array.
         */
        export function head (arr: any[] | string): any | string;


        /**
         * Return array without its last element.
         */
        export function init (arr: any[] | string): any[] | string;


        /**
         * Checks if a given array is a continuous block.
         */
        export function isContinuous<T> (
            arr: T[],
            cmp?: (a: T, b: T) => boolean
        ): boolean;


        /**
         * Checks if a given array is sorted.
         */
        export function isSorted<T> (
            arr: T[],
            cmp?: (a: T, b: T) => boolean
        ): boolean;


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
         * Create a new array with removed duplicates.
         */
        export function removeDuplicates (
            arr: any[],
            iteratee?: (el: any) => (any)
        ): string[];


        /**
         * Shuffle all elements in the given array
         * (Durstenfeld's modification to the Fisher-Yates shuffle algorithm).
         *
         * The operation is taken in-place.
         */
        export function shuffle (arr: any[]): any[];


        /**
         * - `sparse(stop, size)` -> array of 'size' distinct integers
         *     in range `[0..stop-1]`
         * - `sparse(start, stop, size)` -> array of 'size' distinct integers
         *     in range `[start..stop-1]`
         *
         * Generate sparse array of distinct integers
         * with (almost) uniform distribution.
         */
        export function sparse (...args: number[]): number[];


        /**
         * Return array without its head (first element).
         */
        export function tail (arr: any[] | string): any[] | string;


        /**
         * Take the first `n` elements of a given array.
         */
        export function take (n: number): (arr: any[]) => any[];


        /**
         * Take every `nth` element from an `arr` array.
         */
        export function takeEvery (nth: number): (arr: any[]) => any[];


        /**
         * Take the last `n` elements of a given array.
         */
        export function takeLast (n: number): (arr: any[]) => any[];


        /**
         * Zip given arrays using provided `f` operator.
         *
         * Example:
         *
         * ```
         * zipWith((a, b) => a + b)([1, 2, 3, 4], [10, 20, 30, 40])
         * [ 11, 22, 33, 44 ]
         * ```
         */
        export function zipWith<T> (
            f: (...args: any[]) => T
        ): (...arrs: any[][]) => T[];


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
        export function zip (...arrs: any[][]): any[][]

    }

    export const countBy: typeof array.countBy;
    export const draw: typeof array.draw;
    export const drop: typeof array.drop;
    export const dropLast: typeof array.dropLast;
    export const findDuplicates: typeof array.findDuplicates;
    export const flatten: typeof array.flatten;
    export const head: typeof array.head;
    export const init: typeof array.init;
    export const isContinuous: typeof array.isContinuous;
    export const isSorted: typeof array.isSorted;
    export const last: typeof array.last;
    export const range: typeof array.range;
    export const removeDuplicates: typeof array.removeDuplicates;
    export const shuffle: typeof array.shuffle;
    export const sparse: typeof array.sparse;
    export const tail: typeof array.tail;
    export const take: typeof array.take;
    export const takeEvery: typeof array.takeEvery;
    export const takeLast: typeof array.takeLast;
    export const zipWith: typeof array.zipWith;
    export const zip: typeof array.zip;




    /**
     * @namespace async
     * @see {@link module:async}
     */
    export namespace async {

        /**
         * Make any promise cancellable.
         *
         * Example:
         *
         * ```
         * let { promise, cancel } = async.cancellable(
         *     async.timeout(() => "Job done!", 2000)
         * )
         *
         * promise.then(utils.to_("resolved")).catch(utils.to_("rejected"))
         *
         * cancel("I've changed my mind")
         * ```
         */
        export function cancellable (p: Promise<any>): object;


        /**
         * Mutual exclusion for asynchronous functions.
         *
         * Example:
         *
         * ```
         * const mutex = async.createMutex()
         *
         * let f = async (m) => {
         *     let val = await m.lock()
         *     return `Freed with val: ${val}`
         * }
         *
         * f(mutex).then(utils.to_("success")).catch(utils.to_("failure"))
         *
         * mutex.resolve(42)  //  mutex.reject("ERROR")
         * ```
         */
        export function createMutex (): object;


        /**
         * Delay current async execution by `time` miliseconds.
         *
         * Example:
         *
         * ```
         * (async () => {
         *     await async.delay()
         *     console.log("Hello ...")
         *     await async.delay()
         *     console.log("... world")
         * })()
         * ```
         */
        export function delay (
            time?: number,
            passCancel?: (canceller: (reason: any) => void) => void
        ): Promise<number>;


        /**
         * `setInterval` in `Promise` / `async` skin.
         *
         * Example:
         *
         * ```
         * interval(
         *     () => { console.log("Hey!"); return 42 },
         *     (c) => timeout(() => c(), 4 * timeUnit.second)
         * )
         * .then((x) => console.log("Finished:", x))
         * .catch((c) => console.log("Error:", c))
         * ```
         */
        export function interval<T> (
            f: (clear: (reason: any) => T) => T,
            passClear: (clear: (reason: any) => T) => void,
            time?: number
        ): Promise<T>;


        /**
         * Asynchronous version of standard `Array.prototype.map` function.
         *
         * - `arr` - array to operate on
         * - `f` - async or sync function with signature:
         *     - `this` - bound to `arr`
         *     - `element` - currently processed element
         *     - `index` - current index
         *
         * `f` can return `Promise.<any>` or `<any>`
         *
         * Example:
         *
         * ```
         * (async () => {
         *     let x = await async.map(
         *         array.range(10),
         *         (x) => async.timeout(() => 4*x, 100*x)
         *     )
         *     console.log(x)
         * })()
         * ```
         */
        export function map<T> (
            arr: any[],
            f: (el: any, i: number) => Promise<T> | T
        ): Promise<T[]>;


        /**
         * Asynchronous version of standard `Array.prototype.map` function.
         *
         * *Implementation that does paralell execution*.
         *
         * - `arr` - array to operate on
         * - `f` - async or sync function with signature:
         *     - `this` - bound to `arr`
         *     - `element` - currently processed element
         *     - `index` - current index
         *
         * `f` can return `Promise.<any>` or `<any>`
         *
         * Example:
         *
         * ```
         * (async () => {
         *     let x = await parMap(
         *         array.range(10),
         *         (x) => async.timeout(() => 4*x, 100*x)
         *     )
         *     console.log(x)
         * })()
         * ```
         */
        export function parMap<T> (
            arr: any[],
            f: (el: any, i: number) => Promise<T> | T
        ): Promise<T[]>;


        /**
         * Resolve or reject when any of the promises
         * passed as arguments resolve or reject.
         *
         * Complementary function to the standard `Promise.all()`.
         *
         * Example:
         *
         * ```
         * m1 = async.createMutex()
         * m2 = async.createMutex()
         *
         * async.race(m1.lock(), m2.lock())
         *     .then(utils.to_("resolved"))
         *     .catch(utils.to_("rejected"))
         *
         * m1.resolve("All right!")  //  or, e.g: m2.reject("Some left!")
         * ```
         */
        export function race (...ps: Promise<any>[]): Promise<any>;


        /**
         * Asynchronous version of standard `Array.prototype.reduce` function.
         *
         * - `arr` - array to operate on
         * - `f` - async or sync function with signature:
         *     - `this` - bound to `arr`
         *     - `acc` - accumulates the `f`'s return values; it is
         *         the accumulated value previously returned
         *         in the last invocation of `f`, or `initAcc`, if supplied.
         *     - `element` - currently processed element
         *     - `index` - current index
         * - `initAcc` - value to use as the first argument to the first call
         *     of the `f`. If no initial value is supplied, the first element
         *     in the array will be used.
         *
         * `f` can return `Promise.<any>` or `<any>`
         *
         * Example:
         *
         * ```
         * (async () => {
         *     let x = await async.reduce(
         *         array.range(10),
         *         (acc, x) => async.timeout(() => acc+x, 100*x),
         *         0
         *     )
         *     console.log(x)
         * })()
         * ```
         */
        export function reduce<T> (
            arr: any[],
            f: (acc: T, el: any, i: number) => Promise<T> | T,
            initAcc: T
        ): Promise<T>;


        /**
         * Repeat `f` (sync. or async.) while `condition` evaluates to `true`.
         *
         * Resolves with result of last `f` execution
         * when `condition` evaluates to `false`.
         */
        export function repeat<T> (
            f: () => Promise<T> | T,
            condition: () => boolean
        ): Promise<T>;


        /**
         * `setTimeout` in `Promise` / `async` skin.
         *
         * Example:
         *
         * ```
         * async.timeout(
         *     () => { console.log("Hey!"); return 42 }, 2000,
         *     (c) => async.timeout(() => c("Cancelled!"), 1000)
         * )
         * .then((x) => console.log("Success:", x))
         * .catch((c) => console.log("Error or cancel:", c))
         * ```
         */
        export function timeout<T> (
            f: () => T,
            passCancel?: (cancel: () => T) => void,
            time?: number
        ): Promise<T>;

    }

    export const cancellable: typeof async.cancellable;
    export const createMutex: typeof async.createMutex;
    export const delay: typeof async.delay;
    export const interval: typeof async.interval;
    export const asyncMap: typeof async.map;
    export const parMap: typeof async.parMap;
    export const asyncRace: typeof async.race;
    export const asyncReduce: typeof async.reduce;
    export const asyncRepeat: typeof async.repeat;
    export const timeout: typeof async.timeout;




    /**
     * @namespace codec
     * @see {@link module:codec}
     */
    export namespace codec {

        /**
         * Concatenate contents of a given byte arrays (Uint8Array)
         * into a new byte array (Uint8Array).
         */
        export function concatBytes (
            ...u8as: Uint8Array[]
        ): Uint8Array;


        /**
         * Compare two byte arrays.
         */
        export function compareBytes (
            u8a1: Uint8Array,
            u8a2: Uint8Array
        ): Uint8Array;


        /**
         * Convert given a utf8-encoded string to byte array (Uint8Array).
         */
        export function stringToBytes (s: string): Uint8Array;


        /**
         * Convert a given byte array (Uint8Array) to an utf8-encoded string.
         */
        export function bytesToString (bytes: Uint8Array): string;


        /**
         * Convert a hex-encoded string to a byte array (Uint8Array).
         *
         * If given `hexInput` is of odd length (hexInput.length % 2 !== 0)
         * then the last hex-digit is treated as full byte representation,
         * i.e.:
         *
         * ```
         * hexToBytes("fa6") <=> hexToBytes("fa06") <=> Uint8Array [ 250, 6 ]
         * ```
         *
         * All unrecognized hex-digit groups (e.g. "zz") are treated
         * by `parseInt()` as `NaN` and then effectively converted
         * to `Uint8Array [ 0 ]`.
         *
         * Input parameter (`hexInput`) can be prefixed with `0x`.
         *
         * All whitespaces, tabs and carriage returns
         * are stripped out from the input.
         */
        export function hexToBytes (hexInput: string): Uint8Array;


        /**
         * Convert a given byte array (Uint8Array) to a hex-encoded string.
         * Each byte is encoded on the two hexadecimal digits.
         */
        export function bytesToHex (bytes: Uint8Array): string;


        /**
         * Decode given Base64-encoded string into byte array (Uint8Array).
         */
        export function b64dec (s: string): Uint8Array;


        /**
         * Base64-encode given byte array (Uint8Array).
         */
        export function b64enc (bytes: Uint8Array): string;


        /**
         * Base64 decoding for strings (b64-string to utf8-string).
         */
        export function b64ToString (s: string): string;


        /**
         * Base64 encoding for strings (utf8-string to b64-string)
         */
        export function stringToB64 (s: string): string;


        /**
         * Covert a given b64-encoded string to a hex-encoded string.
         */
        export function b64ToHex (s: string): string;


        /**
         * Covert a given hex-encoded string to a b64-encoded string.
         */
        export function hexToB64 (s: string): string;

    }

    export const concatBytes: typeof codec.concatBytes;
    export const compareBytes: typeof codec.compareBytes;
    export const stringToBytes: typeof codec.stringToBytes;
    export const bytesToString: typeof codec.bytesToString;
    export const hexToBytes: typeof codec.hexToBytes;
    export const bytesToHex: typeof codec.bytesToHex;
    export const b64dec: typeof codec.b64dec;
    export const b64enc: typeof codec.b64enc;
    export const b64ToString: typeof codec.b64ToString;
    export const stringToB64: typeof codec.stringToB64;
    export const b64ToHex: typeof codec.b64ToHex;
    export const hexToB64: typeof codec.hexToB64;




    /**
     * @namespace func
     * @see {@link module:func}
     */
    export namespace func {

        /**
         * Functional replacement of a `switch` statement.
         */
        export function choose (
            key: string,
            actions?: object,
            defaultAction?: Function,
            args?: any[]
        ): any;


        /**
         * Function composition - read as "compose backward" or "but first".
         *
         * ```
         * let:
         * f: X -> Y,  g: Y -> Z
         *
         * then:
         * g(f(x))  <=>  (g . f)(x)  <=>  compose(g, f)(x)
         * ```
         */
        export function compose (
            ...fs: Function[]
        ): (...args: any[]) => Function;


        /**
         * Return curried form of a given function `f`.
         *
         * If funcion `f` has _arity_ 3, and `g = curry(f)` then
         * a following invocations have the same result:
         *
         * ```
         * g(a, b, c)
         * g(a, b)(c)
         * g(a)(b, c)
         * g(a)(b)(c)
         * ```
         *
         * Function `f` _arity_ is obtained by checking it's `.length`
         * property, so if function `f` is defined with a _rest parameter_
         * then this parameter is excluded. Also only parameters before
         * the first one with a default value are included.
         */
        export function curry (f: Function): Function;


        /**
         * Translate the evaluation of function `f` taking `n` arguments
         * into an evaluation of sequence of `n` functions, where each
         * next function is a result of previous function evaluation.
         *
         * ```
         * f(a, b, c, d, e)  <=>  curryN(5, f)(a)(b)(c)(d)(e)
         * ```
         */
        export function curryN<T> (
            n: number,
            f: (...args: any[]) => T
        ): (...args: any[]) => Function | T;


        /**
         * Translate the evaluation of function `f` taking multiple arguments
         * into an evaluation of sequence of functions,
         * each with a single argument.
         *
         * Because `curryThunk` doesn't assume anything on passed function
         * `f` _arity_, final invocation has to be done with no arguments.
         *
         * ```
         * f(a, b, c, d)  <=>  curryThunk(f)(a)(b)(c)(d)()
         * ```
         */
        export function curryThunk<T> (
            f: (...args: any[]) => T
        ): (...args: any[]) => Function | T;


        /**
          * Function composition - read as "compose forward" or "and then".
          *
          * ```
          * let:
          * f: X -> Y,  g: Y -> Z
          *
          * then:
          * g(f(x))  <=>  (g . f)(x)  <=>  flow(f, g)(x)
          * ```
          *
          * Inspired by {@link https://github.com/tfausak/flow}.
         */
        export function flow (
            ...fs: Function[]
        ): (...args: any[]) => Function;


        /**
         * Return value passed as a first argument.
         */
        export function identity<T> (val: T): T;


        /**
         * Create function that can "lock the thing".
         *
         * During the first invocation the argument `thing` is memoized
         * and on all subsequent invocations passed arguments are ignored
         * and memoized `thing` is returned.
         *
         * ```
         * let lock = func.locker()
         *
         * lock("I like you!")
         * 'I like you!'
         *
         * lock("I hate you.")
         * 'I like you!'
         * ```
         */
        export function locker<T> (): (val: T) => T


        /**
         * Partial application.
         *
         * Bind `init` arguments to function `f` and construct
         * a function of smaller _arity_ which accept `rest` of the arguments.
         *
         * Example:
         *
         * ```
         * let f = (a, b) => a + b
         * f(3, 4)  ->  7
         * let g = partial(f)(3)  // note that `partial` is in *curried* form
         * g(4)  ->  7
         * ```
         */
        export function partial<T> (
            f: (...args: any[]) => T
        ): (...init: any[]) => (...rest: any[]) => T;


        /**
         * Function composition - read as "compose forward" or "and then".
         * Version of `flow` taking _arguments_ (`args`) first
         * and then _functions_ (`fs`).
         *
         * ```
         * let:
         * f: X -> Y,  g: Y -> Z
         *
         * then:
         * g(f(x))  <=>  (g . f)(x)  <=>  pipe(x)(f, g)
         * ```
         */
        export function pipe (
            ...args: any[]
        ): (...fs: Function[]) => Function;


        /**
         * Function arguments rearrangement.
         *
         * Takes function `f` and `indices` and returns a new function,
         * which has it's arguments arranged according to `indices`.
         *
         * Returned function will expect the number of arguments to be exactly
         * equal to the number of `indices`. If not all of the required
         * arguments will be passed, a new function will be returned
         * expecting _rest_ of the arguments.
         *
         * In other words - function returned by `rearg` is *curried*.
         *
         * Example:
         *
         * ```
         * string.padLeft("Foo", 10, ".")  ->  ".......Foo"
         *
         * let rePad = func.rearg(string.padLeft)(1, 2, 0)  // *curried* form
         * rePad(10, ".", "Bar")  ->  ".......Bar"
         *
         * console.log("a", "b", "c", "d", "e")
         * a b c d e
         *
         * let revConsole = func.rearg(console.log)(4, 3, 2, 1, 0)
         * revConsole("a", "b", "c", "d", "e")
         * e d c b a
         *
         * revConsole("f")("g", "h")("i")("j")
         * j i h g f
         * ```
         */
        export function rearg<T> (
            f: (...args: any[]) => T
        ): (...indices: number[]) => (...args: any[]) => T;


        /**
         * Y-combinator (returns fixed point of a higher-order function
         * passed as `f`).
         */
        export function Y (f: Function): Function;

    }

    export const choose: typeof func.choose;
    export const compose: typeof func.compose;
    export const curry: typeof func.curry;
    export const curryN: typeof func.curryN;
    export const curryThunk: typeof func.curryThunk;
    export const flow: typeof func.flow;
    export const identity: typeof func.identity;
    export const locker: typeof func.locker;
    export const partial: typeof func.partial;
    export const pipe: typeof func.pipe;
    export const rearg: typeof func.rearg;
    export const Y: typeof func.Y;




    /**
     * @namespace math
     * @see {@link module:math}
     */
    export namespace math {


        /**
         * Add two values.
         */
        export function add (a: number, b: number): number;


        /**
         * Compute mathematical average of array of numbers.
         */
        export function average (arr: number[]): number;


        /**
         * If input is greater than zero then return it, else return zero.
         */
        export function clamp (n: number): number;


        /**
         * Base 10 logarithm.
         */
        export function log10 (x: number): number;


        /**
         * Base 2 logarithm.
         */
        export function log2 (x: number): number;


        /**
         * Generate a random positive integer.
         * NOT CRYPTOGRAPHICALLY SECURE.
         */
        export function randomInt (): number;


        /**
         * Round to the nearest integer if the given value is within
         * epsilon range of that integer. Default epsilon is `1e-9`,
         * which can be changed through `precision` parameter.
         */
        export function roundIfClose (x: number, precision?: number): number;


        /**
         * Compute sum of numbers in passed array.
         */
        export function sum (arr: number[]): number;

    }

    export const add: typeof math.add;
    export const average: typeof math.average;
    export const clamp: typeof math.clamp;
    export const log10: typeof math.log10;
    export const log2: typeof math.log2;
    export const randomInt: typeof math.randomInt;
    export const roundIfClose: typeof math.roundIfClose;
    export const sum: typeof math.sum;




    /**
     * @namespace redux
     * @see {@link module:redux}
     */
    export namespace redux {

        /**
         * Create clean and readable reducers for redux.
         */
        export function createReducer (initState?: object): Function;

    }

    export const createReducer: typeof redux.createReducer;




    /**
     * @namespace string
     * @see {@link module:string}
     */
    export namespace string {

        /**
         * Return full set of ASCII letters.
         */
        export function asciiLetters (): string;


        /**
         * Return lowercase ASCII letters.
         */
        export function asciiLowercase (): string;


        /**
         * Return uppercase ASCII letters.
         */
        export function asciiUppercase (): string;


        /**
         * Allocate a big string (of size 2^n). Use with caution!
         *
         * - `big(16)` makes `2^16 = 65536` string size.
         * - `big(23)` makes `2^23 = 8M` string size,
         * - `big(24)` makes `16M` and so on.
         *
         * `c = "x"` - Character used during string generation.
         *
         * Example:
         *
         * ```
         * big(2) === "xxxx"
         * big(3, "a") === "aaaaaaaa"
         * ```
         */
        export function big (n: number, c?: string): string;


        /**
         * Convert `thisKindOfText` to `ThisKindOfText`.
         */
        export function camelToPascal (str: string): string;


        /**
         * Convert `thisKindOfText` to `this_kind_of_text`.
         */
        export function camelToSnake (str: string): string;


        /**
         * Ensure given string is in form `Aaaaaaaa`.
         */
        export function capitalize (str: string): string;


        /**
         * Return all digits.
         */
        export function digits (): string;


        /**
         * Constructs new string with inserted `sep` (of default value `…`)
         * at the `ellipsis.BEGIN`, `ellipsis.MIDDLE` or `ellipsis.END`.
         * Returned string has the same length as input string
         * (thus some original characters are replaced with `sep` contents).
         */
        export function ellipsis (
            str: string,
            placing?: number,
            sep?: string
        ): string;


        /**
         * Construct empty string.
         */
        export function empty (): string;


        /**
         * Construct space.
         */
        export function space (): string;


        /**
         * Construct newline.
         */
        export function nl (): string;


        /**
         * Construct tab.
         */
        export function tab (): string;


        /**
         * Prepend given `input` string with an appropriate amount of
         * `ch` characters so that returning string length is equal to `len`.
         * If `len` is smaller than length of `input` then `input` is being
         * returned untouched (padding doesn't shorten the `input`).
         */
        export function padLeft (
            input: string,
            len: number,
            ch?: string
        ): string;


        /**
         * Append an appropriate amount of `ch` characters to the given `input`
         * string so that returning string length is equal to `len`.
         * If `len` is smaller than length of `input` then `input` is being
         * returned untouched (padding doesn't shorten the `input`).
         */
        export function padRight (
            input: string,
            len: number,
            ch?: string
        ): string;


        /**
         * Convert `ThisKindOfText` to `thisKindOfText`.
         */
        export function pascalToCamel (str: string): string;


        /**
         * Convert `ThisKindOfText` to `this_kind_of_text`.
         */
        export function pascalToSnake (str: string): string;


        /**
         * Quote text.
         */
        export function quote (str?: string, q?: string): string;


        /**
         * Construct random string of desired length.
         */
        export function random (
            size?: number,
            letters?: string
        ): string;


        /**
         * Constructs new string not longer than `len`.
         */
        export function shorten (
            str: string,
            len?: number,
            placing?: number,
            sep?: string
        ): string;


        /**
         * Convert `this_kind_of_text` to `thisKindOfText`.
         */
        export function snakeToCamel (str: string): string;


        /**
         * Convert `this_kind_of_text` to `ThisKindOfText`.
         */
        export function snakeToPascal (str: string): string;


        /**
         * Wrap passed string with `prefix` and `suffix`.
         */
        export function wrap (
            str?: string,
            prefix?: string,
            suffix?: string
        ): string;

    }

    export const asciiLetters: typeof string.asciiLetters;
    export const asciiLowercase: typeof string.asciiLowercase;
    export const asciiUppercase: typeof string.asciiUppercase;
    export const bigString: typeof string.big;
    export const camelToPascal: typeof string.camelToPascal;
    export const camelToSnake: typeof string.camelToSnake;
    export const capitalize: typeof string.capitalize;
    export const digits: typeof string.digits;
    export const ellipsis: typeof string.ellipsis;
    export const emptyString: typeof string.empty;
    export const spaceString: typeof string.space;
    export const nlString: typeof string.nl;
    export const padLeft: typeof string.padLeft;
    export const padRight: typeof string.padRight;
    export const pascalToCamel: typeof string.pascalToCamel;
    export const pascalToSnake: typeof string.pascalToSnake;
    export const quote: typeof string.quote;
    export const randomString: typeof string.random;
    export const shorten: typeof string.shorten;
    export const snakeToCamel: typeof string.snakeToCamel;
    export const snakeToPascal: typeof string.snakeToPascal;
    export const wrap: typeof string.wrap;




    /**
     * @namespace struct
     * @see {@link module:struct}
     */
    export namespace struct {

        /**
         * Apply `path` to an object `o`. Return element reachable through
         * that `path` or `def` value.
         *
         * Example:
         *
         * ```
         * access({ a: { b: [10, { c: 42 }] } }, ["a", "b", 1, "c"])  ===  42
         * ```
         */
        export function access (
            o?: object,
            path?: (string | number)[],
            def?: any
        ): any;


        /**
         * Do the deep-copy of any JavaScript object
         * that doesn't contain functions.
         */
        export function clone (o: object): object;


        /**
         * Construct function appropriate to use as the `children` argument
         * in the `struct.dfs` function. Use it with `struct.dfs` to
         * enumerate on any javascript object.
         */
        export function hashAccessor ():
            (n: object) => [object, (string | number)[]][];


        /**
         * Construct function appropriate to use as the `children` argument
         * in the `struct.dfs` function. Use it with `struct.dfs` if your
         * tree-like structure contains children organized as arrays.
         *
         * E.g. if a `node` is defined as follows:
         *
         * ```
         * node = { val: "something", props: { num: 14, ch: [node1, node2] } }
         * ```
         *
         * then `keyAccessor` should be defined in this way:
         *
         * ```
         * keyAccessor("props", "ch")
         * ```
         *
         * `keyAccessor` called without arguments (`keyAccessor()`) returns
         * `hashAccessor`.
         */
        export function keyAccessor (
            ...path: (string | number)[]
        ): (n: object) => [object, (string | number)[]][];


        /**
         * Depth-first search. Executes certain operation `f`
         * on each `tree` node in reduce-like fashion, accumulating
         * intermediate results.
         */
        export function dfs<T> (
            tree?: object,
            f?: (
                accs: T[],
                node: object,
                path: (string | number)[],
                position: number
            ) => T,
            children?: (
                n: object
            ) => [object, (string | number)[]][]
        ): T;


        /**
         * Construct `Object` from the result of `Object.entries()` call.
         *
         * ```
         * entries = [[k1, v1,], ..., [kn, vn,]]
         * ```
         *
         * Imitates Python's `dict()`.
         */
        export function dict (entries: [string, any][]): object;


        /**
         * Map (iteration) on objects - shallow.
         *
         * - `o` - `Object` to enumerate on.
         * - `f` - `Function` to call on each key, params:
         *     - `this` - bound to the enumerated object,
         *     - `kv` - current `[key, value]` array,
         *
         * `f` should return `[key, value]` array.
         */
        export function objectMap (
            o: object,
            f: (kv: [string, any]) => [string, any]
        ): object;


        /**
         * Reduce (fold) on objects - shallow.
         *
         * - `o` - `Object` to enumerate on.
         * - `f` - `Function` to call on each key, params:
         *     - `this` - bound to the enumerated object,
         *     - `acc` - accumulated value,
         *     - `kv` - current `[key, value]` array,
         * - `init` - accumulated value initializer,
         *
         * `f` should return value of the same type as `init`.
         */
        export function objectReduce<T> (
            o: object,
            f: (acc: T, kv: [string, any]) => T,
            init: T
        ): T;


        /**
         * When `o == { a: "b", c: "d" }`
         * then `swap(o) == { b: "a", d: "c" }`.
         */
        export function swap (o: object): object;

    }

    export const access: typeof struct.access;
    export const clone: typeof struct.clone;
    export const dict: typeof struct.dict;
    export const objectMap: typeof struct.objectMap;
    export const objectReduce: typeof struct.objectReduce;
    export const swap: typeof struct.swap;




    /**
     * @namespace type
     * @see {@link module:type}
     */
    export namespace type {

        /**
         * Determine if a given value is an `Array`.
         */
        export function isArray (a: any): boolean;


        /**
         * Determine if a given value is a `Function`.
         */
        export function isFunction (f: any): boolean;


        /**
         * Determine if a given value is a proper `Number`
         * (not `NaN` and not `Infinity`).
         */
        export function isNumber (n: any): boolean;


        /**
         * Determine if a given value is an `Object`
         * (not `null`, not `undefined` and not `Array`).
         */
        export function isObject (o: any): boolean;


        /**
         * Determine if a given value is a `String`.
         */
        export function isString (s: any): boolean;


        /**
         * Maximum representable safe integer in JavaScript.
         */
        export const maxInt: number;


        /**
         * Minimum representable safe integer in JavaScript.
         */
        export const minInt: number;


        /**
         * If `val` is `null` then return `undefined`, else return `val`.
         */
        export function nullToUndefined (val: any): any;


        /**
         * Returns `false` for all **falsy** values
         * (`false`, `0`, `""`, `null`, `undefined`, and `NaN`),
         * and `true` for all **truthy** values.
         */
        export function toBool (x: any): boolean;

    }

    export const isArray: typeof type.isArray;
    export const isFunction: typeof type.isFunction;
    export const isNumber: typeof type.isNumber;
    export const isObject: typeof type.isObject;
    export const isString: typeof type.isString;
    export const maxInt: typeof type.maxInt;
    export const minInt: typeof type.minInt;
    export const nullToUndefined: typeof type.nullToUndefined;
    export const toBool: typeof type.toBool;




    /**
     * @namespace utils
     * @see {@link module:utils}
     */
    export namespace utils {

        /**
         * Determine runtime environment (is it development or not?).
         * `devEnv() -> true/false`
         *
         * When `strict` is not set to `true` then "development environment"
         * can be simulated by storing value of any type under "dev" key
         * in browser's sessionStorage, e.g. `sessionStorage[dev] = true`.
         */
        export function devEnv (strict: boolean): boolean;


        /**
         * Get useful library configuration variables.
         */
        export function getLibConfig (): object;


        /**
         * Return global `process` variable if it exists.
         */
        export function getProcess (): object;


        /**
         * Handle exceptions in expressions.
         */
        export function handleException<T> (
            fn: () => T,
            handler?: (ex: any) => T
        ): T;


        /**
         * Handle rejections in expressions.
         * Async version of `handleException`.
         */
        export function handleRejection<T> (
            fn: () => Promise<T>,
            handler?: (ex: any) => Promise<T>
        ): Promise<T>;


        /**
         * Check current runtime environment.
         */
        export function isBrowser (): boolean;


        /**
         * Time units represented in milliseconds.
         *
         * - `second` - `1000 milliseconds`
         * - `minute` - `60 seconds`
         * - `hour` - `60 minutes`
         * - `day` - `24 hours`
         * - `week` - `7 days`
         * - `month` - [**average** month]: `30.4375 days` (`365.25 days / 12`)
         * - `quarter` - [**average** quarter]: `3 months` (`365.25 days / 4`)
         * - `year` - [**average** year]: `365.25 days`
         */
        export interface TimeUnit {
            second: number;
            minute: number;
            hour: number;
            day: number;
            week: number;
            month: number;
            quarter: number;
            year: number;
        }
        export const timeUnit: TimeUnit;


        /**
         * Assign argument to the global object.
         * Async-console-dev-helper.
         */
        export function to_(name?: string): Function;

    }

    export const devEnv: typeof utils.devEnv;
    export const getLibConfig: typeof utils.getLibConfig;
    export const getProcess: typeof utils.getProcess;
    export const handleException: typeof utils.handleException;
    export const handleRejection: typeof utils.handleRejection;
    export const isBrowser: typeof utils.isBrowser;
    export const timeUnit: typeof utils.timeUnit;
    export const to_: typeof utils.to_;




}
