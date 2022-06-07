import _ from "lodash";

const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "FETCH_GAME":
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default gameReducer;
