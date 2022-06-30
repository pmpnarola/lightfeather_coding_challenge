import { combineReducers } from "redux";

import generalReducer from "./generalReducers";

export default combineReducers({
	general: generalReducer,
});
