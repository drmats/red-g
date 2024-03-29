/**
 * Redux reducer tools.
 *
 * @module redux
 * @license Apache-2.0
 * @copyright Mat. 2020-present
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { Fun } from "@xcmats/js-toolbox/type";
import { choose, identity } from "@xcmats/js-toolbox/func";

import {
    isACWithPayload,
    isWithPayload,
    type Action,
    type ActionCreator,
    type EmptyActionCreator,
    type PayloadAction,
    type PayloadActionCreator,
    type ReduxCompatAction,
    type ReduxCompatUnknownAction,
} from "../redux/action";




/**
 * redux-compatible Reducer type.
 */
export type ReduxCompatReducer<
    StateType = any,
    ActionShape extends ReduxCompatAction = ReduxCompatUnknownAction,
    PreloadedStateType = StateType,
> = (
    state: StateType | PreloadedStateType | undefined,
    action: ActionShape,
) => StateType;




/**
 * Reducer - function taking state and action and returning a new state.
 */
export type Reducer<
    StateType = any,
    PayloadType = any,
    ActionType extends string = string,
> = (
    state: StateType,
    action: Action<PayloadType, ActionType>,
) => StateType;




/**
 * Create clean and readable reducers for redux.
 *
 * @function createReducer
 * @param initState
 * @returns {ReduxBoundReducer}
 */
export function createReducer<StateType> (initState: StateType): (
    reducers: Record<string, Reducer<StateType>>,
    defaultReducer?: Reducer<StateType>,
) => ReduxCompatReducer<StateType, Action> {
    return (reducers, defaultReducer = identity) =>
        (state = initState, action) =>
            choose(
                action.type,
                reducers,
                defaultReducer,
                [state, action],
            );
}




/**
 * Chainable API for building reducer handling a slice of state.
 */
interface SliceBuildAPI<StateType> {
    // handle empty action (overload)
    handle<ActionType extends string> (
        actionCreator: EmptyActionCreator<ActionType>,
        reducer: (state: Readonly<StateType>) => Readonly<StateType>,
    ): SliceBuildAPI<StateType>;
    // handle action with payload (overload)
    handle<ActionType extends string, PayloadType> (
        actionCreator: PayloadActionCreator<PayloadType, ActionType>,
        reducer: (
            state: Readonly<StateType>,
            payload: PayloadType,
        ) => Readonly<StateType>,
    ): SliceBuildAPI<StateType>;
    // handle unmatched actions
    default (
        reducer: (
            state: Readonly<StateType>,
            action: Action,
        ) => Readonly<StateType>,
    ): SliceBuildAPI<StateType>;
    // match actions using type predicate - useful for matching actions
    // by payload content (overload)
    match<PayloadType> (
        predicate: (action: Action) => action is Action<PayloadType>,
        reducer: (
            state: Readonly<StateType>,
            payload: PayloadType,
        ) => Readonly<StateType>,
    ): SliceBuildAPI<StateType>;
    // match action using boolean predicate - useful for matching actions
    // using string operations on their type (overload)
    match (
        predicate: (action: Action) => boolean,
        reducer: (
            state: Readonly<StateType>,
            payload: never,
        ) => Readonly<StateType>,
    ): SliceBuildAPI<StateType>;
}




/**
 * Statically typed reducer for a slice of state.
 *
 * @function sliceReducer
 * @param initState
 * @returns (builder: (slice: SliceBuildAPI) => void) => ReduxCompatReducer
 */
export function sliceReducer<StateType> (initState: StateType): (
    builder: (slice: SliceBuildAPI<StateType>) => void,
) => ReduxCompatReducer<Readonly<StateType>, Action> {

    const
        reducers = {} as Record<string, Fun>,
        matchers = [] as ReduxCompatReducer<Readonly<StateType>, Action>[];
    let defaultReducer: (
        state: Readonly<StateType>,
        action: Action,
    ) => Readonly<StateType>;

    const
        create = createReducer(initState),
        slice: SliceBuildAPI<StateType> = {
            // handle concrete type of action
            handle: <ActionType extends string, PayloadType>(
                actionCreator: ActionCreator<PayloadType, ActionType>,
                reducer: (
                    state: Readonly<StateType>,
                    payload?: PayloadType,
                ) => Readonly<StateType>,
            ): typeof slice => {
                if (isACWithPayload(actionCreator)) {
                    reducers[actionCreator.type] = (
                        state: Readonly<StateType>,
                        action: PayloadAction<PayloadType, ActionType>,
                    ) => reducer(state, action.payload);
                } else {
                    reducers[actionCreator.type] = (
                        state: Readonly<StateType>,
                    ) => reducer(state);
                }
                return slice;
            },
            // handle unmatched actions (state identity by default)
            default: (reducer) => {
                defaultReducer = reducer;
                return slice;
            },
            // additionally match actions using predicate (matcher is run
            // against all actions - handled and unhandled earlier)
            match: (
                predicate: (action: Action) => boolean,
                reducer: any,
            ): typeof slice => {
                matchers.push(
                    (state, action) =>
                        predicate(action) ?
                            isWithPayload(action) ?
                                reducer(state ?? initState, action.payload) :
                                reducer(state ?? initState) :
                            state ?? initState,

                );
                return slice;
            },
        };

    // function building actual reducer based on provided builder function
    return (builder) => {

        // build `reducers` object and `matchers` array
        builder(slice);

        // create main (slice) reducer
        const reducer = defaultReducer ?
            create(reducers, defaultReducer) :
            create(reducers);

        // return reducer that is also applying all defined matchers
        return (state, action) => {
            let localState = reducer(state, action);
            for (const match of matchers) {
                localState = match(localState, action);
            }
            return localState;
        };

    };

}
