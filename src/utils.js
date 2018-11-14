/**
 * Various tools.
 *
 * @module utils
 * @license Apache-2.0
 * @author drmats
 */




import {
    dependencies,
    description,
    homepage,
    license,
    name,
    version,
} from "../package.json"
import { quote } from "./string"
import { access } from "./struct"
import {
    isFunction,
    isObject,
    isString,
    maxInt,
    toBool,
} from "./type"




/**
 * Functional replacement of a `switch` statement.
 *
 * @function choose
 * @param {String} key
 * @param {Object.<String, Function>} actions
 * @param {Function} defaultAction
 * @param {Array} args
 * @returns {*}
 */
export const choose = (
    key,
    actions = {},
    defaultAction = () => null,
    args = []
) =>
    key in actions ?
        actions[key](...args) :
        defaultAction(...args)




/**
 * Do the deep-copy of any JavaScript object
 * that doesn't contain functions.
 *
 * @function clone
 * @param {Object} o
 * @returns {Object}
 */
export const clone = (o) => JSON.parse(JSON.stringify(o))




/**
 * Determine runtime environment (is it development or not?).
 * `devEnv() -> true/false`
 *
 * When `strict` is not set to `true` then "development environment"
 * can be simulated by storing value of any type under "dev" key
 * in browser's sessionStorage, e.g. `sessionStorage[dev] = true`.
 *
 * @function devEnv
 * @param {Boolean} [strict=false]
 * @returns {Boolean}
 */
export const devEnv = (strict = false) =>
    (
        // if you're in browser and not in strict mode
        // then check if there is "dev" key in `sessionStorage`
        isBrowser()  &&  !strict ?
            handleException(
                () => Object.prototype.hasOwnProperty.call(
                    sessionStorage, "dev"
                ),
                () => false
            ) : false
    )  ||  (
        // or if there is a `string` under `process.env.NODE_ENV`
        // and it is not equal to "production"
        isString(access(getProcess(), ["env", "NODE_ENV"]))  &&
        access(getProcess(), ["env", "NODE_ENV"]) !== "production"
    )  ||  (
        // or, maybe, you're not in browser
        // and there is no `string` under `process.env.NODE_ENV`,
        // which happens in "bare" node.js console
        !isBrowser()  &&
        !isString(access(getProcess(), ["env", "NODE_ENV"]))
    )




/**
 * Get useful library configuration variables.
 *
 * @function getLibConfig
 * @returns {Object}
 */
export const getLibConfig = () => ({
    dependencies,
    description,
    homepage,
    license,
    name,
    version,
})




/**
 * Return global `process` variable if it exists.
 * Also give "transform-inline-environment-variables" plugin a chance.
 *
 * @function getProcess
 * @returns {Object}
 */
export const getProcess = () => (
    (envvars) =>
        // eslint-disable-next-line
        isObject(process) ? {
            ...process,
            // eslint-disable-next-line
            browser: toBool(process.browser),
            env: {
                ...process.env,
                ...envvars,
            },
        } : {
            // eslint-disable-next-line
            browser: toBool(process.browser),
            env: envvars,
        }
)({
    NODE_ENV: handleException(
        // eslint-disable-next-line
        () => process.env.NODE_ENV
    ),
    BABEL_ENV: handleException(
        // eslint-disable-next-line
        () => process.env.BABEL_ENV
    ),
})




/**
 * Handle exceptions in expressions.
 *
 * @function handleException
 * @param {Function} fn
 * @param {Function} [handler]
 * @returns {*}
 */
export const handleException = (fn, handler = null) => {
    try { return fn() }
    catch (ex) { return isFunction(handler)  ?  handler(ex)  :  ex }
}




/**
 * Handle rejections in expressions.
 * Async version of `handleException`.
 *
 * @async
 * @function handleRejection
 * @param {Function} fn
 * @param {Function} [handler]
 * @returns {Promise}
 */
export const handleRejection = async (fn, handler = null) => {
    try { return await fn() }
    catch (ex) { return isFunction(handler)  ?  await handler(ex)  :  ex }
}




/**
 * Check current runtime environment.
 *
 * @function isBrowser
 * @returns {Boolean}
 */
export const isBrowser = () => toBool(getProcess().browser)




/**
 * Generate a random positive integer.
 * NOT CRYPTOGRAPHICALLY SECURE.
 *
 * @function randomInt
 * @returns {Number}
 */
export const randomInt = () => Math.floor(Math.random() * (maxInt * 1e-3))




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
 *
 * @name timeUnit
 */
export const timeUnit = Object.freeze({
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: 2629800000,
    quarter: 7889400000,
    year: 31557600000,
})




/**
 * Assign argument to the global object.
 * Async-console-dev-helper.
 *
 * @function to_
 * @param {String} name
 * @returns {Function} (*) => *
 */
export const to_ = (name = "_") =>
    (val) => {
        // eslint-disable-next-line no-console
        console.log(`${name} = ${quote(typeof val, "[]")}`)
        handleException(
            () => {
                (window || self)[name] = val
                // eslint-disable-next-line no-console
                console.log(val)
            },
            () => {
                if (!isBrowser()) {
                    // hide the repl require from webpack
                    let { repl } = eval("require(\"repl\")")
                    repl.context[name] = val
                    // eslint-disable-next-line no-console
                    console.log(val)
                    repl.context.process.stdout.write(repl._prompt)
                }
            }
        )
        return val
    }
