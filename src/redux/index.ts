import * as action from "../redux/action";
import * as reducer from "../redux/reducer";
export * from "../redux/action";
export * from "../redux/reducer";
export default Object.assign({}, action, reducer);
