import { createStore, applyMiddleware } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import rootReducer from "../Reducers";

const middleware = [thunk];

const store = createStore(
	rootReducer,
	composeWithDevToolsDevelopmentOnly(applyMiddleware(...middleware))
);

export default store;