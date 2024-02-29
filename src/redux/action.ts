/**
 * Redux action tools.
 *
 * @module redux
 * @license Apache-2.0
 * @copyright Mat. 2020-present
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
    isString,
    toBool,
    type AllowSubset,
    type Arr,
    type Fun,
    type NonConstEnum,
    type Override,
} from "@xcmats/js-toolbox/type";
import { objectMap } from "@xcmats/js-toolbox/struct";




/**
 * redux-compatible Action interface.
 */
export interface ReduxCompatAction<ActionType extends string = string> {
    type: ActionType;
}




/**
 * redux-compatible AnyAction interface.
 */
export interface ReduxCompatUnknownAction extends ReduxCompatAction {
    [extraProps: string]: unknown;
}




/**
 * Unique, private identifier distinguishing
 * between EmptyAction and PayloadAction (statically and in runtime).
 */
const payload = Symbol("payload");




/**
 * Empty action consists just of { type: ActionType } field.
 */
export interface EmptyAction<
    ActionType extends string = string,
> extends ReduxCompatAction<ActionType> {
    [payload]: false;
}




/**
 * Action with payload: { type: ActionType, payload: PayloadType }
 */
export interface PayloadAction<
    PayloadType = any,
    ActionType extends string = string,
> extends ReduxCompatAction<ActionType> {
    [payload]: true;
    payload: PayloadType;
}




/**
 * Empty action or action carrying payload.
 */
export type Action<
    PayloadType = any,
    ActionType extends string = string,
> =
    | EmptyAction<ActionType>
    | PayloadAction<PayloadType, ActionType>;




/**
 * Type predicate - does a given action carry payload?
 */
export function isWithPayload<PayloadType, ActionType extends string> (
    a: Action<PayloadType, ActionType>,
): a is PayloadAction<PayloadType, ActionType> {
    return a[payload];
}




/**
 * Action creator not carrying anything else than just `type` field.
 */
export interface EmptyActionCreator<
    ActionType extends string,
> extends EmptyAction<ActionType> {
    (): EmptyAction<ActionType>;
}




/**
 * Action creator carrying payload (more than just `type`).
 */
export interface PayloadActionCreator<
    PayloadType = any,
    ActionType extends string = string,
    Args extends Arr = Arr,
> extends EmptyAction<ActionType> {
    (...args: Args): PayloadAction<PayloadType, ActionType>;
}




/**
 * Any action creator (carrying just `type` or `type` and `payload`).
 */
export interface ActionCreator<
    PayloadType = any,
    ActionType extends string = string,
    Args extends Arr = Arr,
> extends EmptyAction<ActionType> {
    (...args: Args): Action<PayloadType, ActionType>;
}




/**
 * Type predicate - not exposed red-g's internal.
 */
export function isACWithPayload<
    PayloadType,
    ActionType extends string,
    Args extends Arr = Arr,
> (
    a: ActionCreator<PayloadType, ActionType, Args>,
): a is PayloadActionCreator<PayloadType, ActionType, Args> {
    return a[payload];
}




/**
 * Redux action creator definer.
 *
 * @function defineActionCreator
 * @param actionType Action type
 * @param creator Optional custom function returning payload.
 * @returns Action creator function.
 */
export function defineActionCreator<
    ActionType extends string,
> (actionType: ActionType):
    EmptyActionCreator<ActionType>;
export function defineActionCreator<
    ActionType extends string,
    PayloadType,
    Args extends Arr,
> (actionType: ActionType, creator?: Fun<Args, PayloadType>):
    PayloadActionCreator<PayloadType, ActionType, Args>;
export function defineActionCreator<
    ActionType extends string,
    PayloadType,
    Args extends Arr,
> (actionType: ActionType, creator?: Fun<Args, PayloadType>):
    ActionCreator<PayloadType, ActionType, Args> {
    const actionCreator: any = !creator ?
        () => ({
            type: actionType,
            [payload]: false,
        }) :
        (...args: Args) => ({
            type: actionType,
            [payload]: true,
            payload: creator(...args),
        });
    actionCreator.type = actionType;
    actionCreator[payload] = toBool(creator);
    return actionCreator;
}




/**
 * Construct interface based on `ActionEnum`. Consist of empty action
 * creators (action creators without payload - just `type` field).
 */
export type EmptyActionCreators<
    ActionEnum extends NonConstEnum<string, string>,
> = {
    [K in keyof ActionEnum]: EmptyActionCreator<ActionEnum[K]>;
};




/**
 * Construct object whose keys correspond to `actionEnum` keys and
 * values consists of empty action creators for each type. Conforms to
 * `EmptyActionCreators<ActionEnum>` interface.
 *
 * @function emptyActionCreators
 * @param actionEnum Enum upon which an EmptyActionCreators object is built.
 * @returns EmptyActionCreators object.
 */
export function emptyActionCreators<
    ActionEnum extends NonConstEnum<string, string>,
> (
    actionEnum: ActionEnum,
): EmptyActionCreators<ActionEnum> {
    const actions = {} as EmptyActionCreators<ActionEnum>;
    for (const actionType in actionEnum) {
        actions[actionType] = defineActionCreator(actionEnum[actionType]);
    }
    return actions;
}




/**
 * Take `ActionEnum` type with `PayloadCreators` object type and construct
 * `PayloadActionCreators` on its basis.
 *
 * Constructed `PayloadActionCreators` object type consists only of keys
 * that are also present in `ActionEnum` type (all other keys are dropped).
 */
export type PayloadActionCreators<
    ActionEnum extends NonConstEnum<string, string>,
    PayloadCreators,
> = {
    [K in Extract<keyof PayloadCreators, keyof ActionEnum>]:
        PayloadCreators[K] extends Fun<infer Args, infer PayloadType> ?
            PayloadActionCreator<PayloadType, ActionEnum[K], Args> : never;
};




/**
 * Take empty action creators object based on `ActionEnum` type
 * (an object with all action creators not carrying anything besides
 * `type` property) and `PayloadCreators` object consisting of plain
 * javascript functions taking arguments and returning values.
 *
 * `PayloadCreators` object type is constrained to be a subset of `ActionEnum`
 * type (in the sense of `AllowSubset` type defined in `type/utils.ts`).
 *
 * Create fully typed action creators object with all action creators
 * defined as `EmptyActionCreator` or `PayloadActionCreator`.
 *
 * @function payloadActionCreators
 * @param emptyActionCreators EmptyActionCreators object
 * @param payloadCreators Object with payload creators.
 * @returns ActionCreators object.
 */
export function payloadActionCreators<
    ActionEnum extends NonConstEnum<string, string>,
    PayloadCreators extends
        & AllowSubset<ActionEnum, PayloadCreators>
        & Partial<Record<keyof ActionEnum, Fun>>,
> (
    emptyActionCreators: EmptyActionCreators<ActionEnum>,
    payloadCreators: PayloadCreators,
):
    Override<
        typeof emptyActionCreators,
        PayloadActionCreators<ActionEnum, PayloadCreators>
    >
{
    return Object.assign(
        emptyActionCreators,
        objectMap(payloadCreators) <keyof ActionEnum>(([key, creator]) => [
            key, defineActionCreator(emptyActionCreators[key].type, creator),
        ]),
    );
}




/**
 * Construct action slice for provided action enum. Optionally
 * define action creators with payload. Statically typed.
 *
 * @function actionCreators
 * @param actionEnum Enum upon which an ActionCreators object is built.
 * @param payloadCreators Optional object with payload creators.
 * @returns ActionCreators object.
 */
export function actionCreators<
    ActionEnum extends NonConstEnum<string, string>,
> (actionEnum: ActionEnum): EmptyActionCreators<ActionEnum>;
export function actionCreators<
    ActionEnum extends NonConstEnum<string, string>,
    PayloadCreators extends
        & AllowSubset<ActionEnum, PayloadCreators>
        & Partial<Record<keyof ActionEnum, Fun>>,
> (
    actionEnum: ActionEnum,
    payloadCreators?: PayloadCreators,
):
    Override<
        EmptyActionCreators<ActionEnum>,
        PayloadActionCreators<ActionEnum, PayloadCreators>
    >;
export function actionCreators<
    ActionEnum extends NonConstEnum<string, string>,
    PayloadCreators extends
        & AllowSubset<ActionEnum, PayloadCreators>
        & Partial<Record<keyof ActionEnum, Fun>>,
> (
    actionEnum: ActionEnum,
    payloadCreators?: PayloadCreators,
):
    | EmptyActionCreators<ActionEnum>
    | Override<
        EmptyActionCreators<ActionEnum>,
        PayloadActionCreators<ActionEnum, PayloadCreators>
    >
{
    const eac = emptyActionCreators(actionEnum);
    if (payloadCreators) {
        return payloadActionCreators(eac, payloadCreators);
    } else {
        return eac;
    }
}




/**
 * Dispatch-bound action creators and thunks contain type field.
 */
type WithTypeField<T, ActionType extends string = string> =
    & T
    & { type: ActionType };




/**
 * Checks for `type` field presence in a given candidate.
 */
const isWithTypeField = <
    T,
    ActionType extends string = string,
>(c: T): c is WithTypeField<T, ActionType> => {
    try {
        return (
            typeof c !== "undefined" &&
            c != null &&
            isString((c as { type?: ActionType }).type)
        );
    } catch {
        return false;
    }
};




/**
 * Infer return type if `T` is function, return `T` itself otherwise.
 */
type ReturnTypeOrType<T> = T extends (...args: any) => infer R ? R : T;




/**
 * Binds given action creator or thunk with chosen store's dispatch.
 *
 * @function bindActionCreator
 * @param actionCreatorOrThunk any action creator or thunk
 * @param dispatch redux store's `dispatch` function
 * @returns bound action creator or thunk dispatch
 */
export function bindActionCreator<
    AcIn extends any[], AcOut,
    ActionType extends string = string,
> (
    actionCreatorOrThunk: Fun<AcIn, AcOut>,
    dispatch: Fun<[AcOut]>,
    type?: ActionType,
): WithTypeField<Fun<AcIn, ReturnTypeOrType<AcOut>>, ActionType> {
    const boundActionCreatorOrThunk =
        (...args: AcIn) => dispatch(actionCreatorOrThunk(...args));
    if (
        isWithTypeField<typeof actionCreatorOrThunk, ActionType>(
            actionCreatorOrThunk,
        )
    ) {
        boundActionCreatorOrThunk.type = actionCreatorOrThunk.type;
    } else {
        boundActionCreatorOrThunk.type = (
            type ?? `${actionCreatorOrThunk.name}()`
        ) as ActionType;
    }
    return boundActionCreatorOrThunk;
}




/**
 * Redux's original `bindActionCreators` clone with extended `Action`
 * support (original function assumes dispatch parametrized with redux's
 * `UnknownAction` which is not compatible with `Action`).
 *
 * Turns an object with action creators or thunks into an object with every
 * action creator wrapped into a `dispatch` call.
 *
 * @function bindActionCreators
 * @param actionCreators Object with action creator functions
 * @param dispatch redux store's `dispatch` function
 * @returns Object with wrapped action creators
 */
export function bindActionCreators<
    ActionCreators extends { [P in keyof ActionCreators]: ActionCreators[P] },
    AcOuts = ActionCreators[keyof ActionCreators],
    BoundActionCreators = {
        [P in keyof ActionCreators]:
            WithTypeField<
                Fun<
                    Parameters<ActionCreators[P]>,
                    ReturnTypeOrType<ReturnType<ActionCreators[P]>>
                >
            >
    },
> (
    actionCreators: ActionCreators,
    dispatch: Fun<[AcOuts]>,
    treeName?: string,
): BoundActionCreators {
    return objectMap(actionCreators) (
        ([k, a]) => [
            k,
            bindActionCreator(
                a, dispatch,
                treeName ? `${treeName}.${String(k)}()` : `${String(k)}()`,
            ),
        ],
    ) as BoundActionCreators;
}




/**
 * Bind whole tree of action creators to the redux's dispatch function.
 *
 * @function bindActionCreatorsTree
 * @param acTree Object with `actionCreators` objects
 * @param dispatch redux store's `dispatch` function
 * @returns Object with wrapped action creators
 */
export function bindActionCreatorsTree<
    ACTree extends { [P in keyof ACTree]: ACTree[P] },
    ActionCreators = ACTree[keyof ACTree],
    AcOuts = ActionCreators[keyof ActionCreators],
    BoundACTree = {
        [P in keyof ACTree]:
            ReturnType<
                typeof bindActionCreators<
                    ACTree[P], ACTree[P][keyof ACTree[P]]
                >
            >
    },
> (
    acTree: ACTree,
    dispatch: Fun<[AcOuts]>,
): BoundACTree {
    return objectMap(acTree) (
        ([k, a]) => [k, bindActionCreators(a, dispatch, String(k))],
    ) as BoundACTree;
}
