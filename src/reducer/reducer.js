const initState = {
	search: [],
};

export const reducer = (state = initState, action) => {
	if (action.type === "SET_SEARCH") {
		return {
			...state,
			search: action.payload,
		};
	}

	return state;
};
