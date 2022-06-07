import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  auth: authReducer,
  games: gameReducer,
  cart: cartReducer,
  order: orderReducer,
});
