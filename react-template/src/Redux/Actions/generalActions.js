import Axios from "../../services/axios-instance";
import {
	GET_SUPERVISORS_FAILED,
	GET_SUPERVISORS_REQUEST,
	GET_SUPERVISORS_SUCCESS
} from "../actionTypes";

export const getSupervisors = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_SUPERVISORS_REQUEST });
			let response = await Axios.get("/supervisors");
			dispatch({ type: GET_SUPERVISORS_SUCCESS, payload: response.data.data });
		} catch (error) {
			dispatch({
				type: GET_SUPERVISORS_FAILED,
				payload: error.response.data,
			});
		}
	};
};
