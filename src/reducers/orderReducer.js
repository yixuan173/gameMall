import _ from "lodash";

const INITIAL_STATE = {};

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "ADD_TO_ORDER":
      return { ...state, [action.payload.id]: action.payload };
    case "CLEAR_ORDER":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default orderReducer;
