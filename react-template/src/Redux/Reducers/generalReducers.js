import {
	GET_SUPERVISORS_REQUEST,
	GET_SUPERVISORS_SUCCESS,
	GET_SUPERVISORS_FAILED,
} from "../actionTypes";

const initialState = {
	isLoading: false,
	errorMessage: "",
	supervisors: [],
};

const generalReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_SUPERVISORS_REQUEST:
			return {
				...state,
				isLoading: true,
				errorMessage: "",
			};

		case GET_SUPERVISORS_FAILED:
			return {
				...state,
				errorMessage: payload,
				isLoading: false,
			};

		case GET_SUPERVISORS_SUCCESS:
			return {
				...state,
				supervisors: payload,
				isLoading: false,
			};

		default:
			return state;
	}
};

export default generalReducer;
