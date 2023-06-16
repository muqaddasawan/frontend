import { combineReducers, applyMiddleware, createstore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import cartReducer from "./Reducer/cartReducer";

const reducer = combineReducers({
  cart: cartReducer,
});

const initialstate = {};

const middleware = [thunk];

const store = createstore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
