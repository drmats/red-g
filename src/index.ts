/**
 * Red-g.
 *
 * @license Apache-2.0
 * @copyright Mat. 2020-present
 */




/**
 * @see {@link module:redux}
 */
export {
    actionCreators,
    bindActionCreator,
    bindActionCreators,
    bindActionCreatorsTree,
    defineActionCreator,
    emptyActionCreators,
    isStringActionType,
    isWithPayload,
    payloadActionCreators,
    type Action,
    type ActionCreator,
    type EmptyAction,
    type EmptyActionCreator,
    type EmptyActionCreators,
    type PayloadAction,
    type PayloadActionCreator,
    type PayloadActionCreators,
    type ReduxCompatAction,
} from "./redux/action";
export {
    createReducer,
    sliceReducer,
    type Reducer,
    type ReduxCompatReducer,
} from "./redux/reducer";
export * as redux from "./redux";
