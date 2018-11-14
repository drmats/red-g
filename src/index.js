/**
 * Javascript toolbox.
 *
 * @license Apache-2.0
 * @author drmats
 */




/**
 * @see {@link module:array}
 */
export {
    countBy,
    draw,
    drop,
    dropLast,
    findDuplicates,
    flatten,
    head,
    init,
    isContinuous,
    isSorted,
    last,
    range,
    shuffle,
    sparse,
    tail,
    take,
    takeLast,
    zipWith,
    zip,
} from "./array"
import * as arrayModule from "./array"
export const array = arrayModule




/**
 * @see {@link module:async}
 */
export {
    delay,
    interval,
    map as asyncMap,
    parMap,
    reduce as asyncReduce,
    repeat as asyncRepeat,
    timeout,
} from "./async"
import * as asyncModule from "./async"
export const async = asyncModule




/**
 * @see {@link module:codec}
 */
export {
    b64dec,
    b64enc,
    b64ToHex,
    b64ToString,
    bytesToHex,
    bytesToString,
    concatBytes,
    compareBytes,
    hexToB64,
    hexToBytes,
    stringToB64,
    stringToBytes,
} from "./codec"
import * as codecModule from "./codec"
export const codec = codecModule




/**
 * @see {@link module:func}
 */
export {
    choose,
    compose,
    curry,
    flow,
    identity,
    partial,
    pipe,
    rearg,
    Y,
} from "./func"
import * as funcModule from "./func"
export const func = funcModule




/**
 * @see {@link module:math}
 */
export {
    average,
    clamp,
    log10,
    log2,
    randomInt,
    roundIfClose,
    sum,
} from "./math"
import * as mathModule from "./math"
export const math = mathModule




/**
 * @see {@link module:redux}
 */
export {
    createReducer,
} from "./redux"
import * as reduxModule from "./redux"
export const redux = reduxModule




/**
 * @see {@link module:string}
 */
export {
    asciiLetters,
    asciiLowercase,
    asciiUppercase,
    big as bigString,
    camelToPascal,
    camelToSnake,
    capitalize,
    digits,
    ellipsis,
    empty as emptyString,
    space as spaceString,
    nl as nlString,
    padLeft,
    padRight,
    pascalToCamel,
    pascalToSnake,
    quote,
    random as randomString,
    shorten,
    snakeToCamel,
    snakeToPascal,
    wrap,
} from "./string"
import * as stringModule from "./string"
export const string = stringModule




/**
 * @see {@link module:struct}
 */
export {
    access,
    clone,
    hashAccessor,
    keyAccessor,
    dfs,
    dict,
    objectMap,
    objectReduce,
    swap,
} from "./struct"
import * as structModule from "./struct"
export const struct = structModule




/**
 * @see {@link module:type}
 */
export {
    isArray,
    isFunction,
    isNumber,
    isObject,
    isString,
    maxInt,
    minInt,
    nullToUndefined,
    toBool,
} from "./type"
import * as typeModule from "./type"
export const type = typeModule




/**
 * @see {@link module:utils}
 */
export {
    devEnv,
    getLibConfig,
    getProcess,
    handleException,
    handleRejection,
    isBrowser,
    timeUnit,
    to_,
} from "./utils"
import * as utilsModule from "./utils"
export const utils = utilsModule
