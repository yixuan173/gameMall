import _ from "lodash";

const INITIAL_STATE = {};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_CART":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "CLEAR_CART":
      return INITIAL_STATE;
    case "ADD_TO_CART":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "EDIT_CART":
      return { ...state, [action.payload.id]: action.payload };
    case "DELETE_GAME_IN_CART":
      return _.omit(state, action.payload);
    case "DELETE_CART":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default cartReducer;
