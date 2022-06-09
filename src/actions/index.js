import games from "../apis/games";

// 登入登出
export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

// 獲取遊戲資訊
export const fetchGames = () => async (dispatch) => {
  const res = await games.get("/games");

  dispatch({ type: "FETCH_GAMES", payload: res.data });
};

export const fetchGame = (id) => async (dispatch) => {
  const res = await games.get(`/games/${id}`);

  dispatch({ type: "FETCH_GAME", payload: res.data });
};

// 購物車CRUD
export const fetchCart = (userId) => async (dispatch) => {
  const res = await games.get(`/cart/${userId}`);

  dispatch({ type: "FETCH_CART", payload: res.data.gameList });
};

export const clearCart = () => {
  return { type: "CLEAR_CART" };
};

export const addToCart = (values) => async (dispatch) => {
  const res = await games.post("/cart", values);

  dispatch({ type: "ADD_TO_CART", payload: res.data.gameList });
};

export const editCart = (userId, gameId, values) => async (dispatch) => {
  const res = await games.patch(`/cart/${userId}`, values);
  const game = res.data.gameList.filter((item) => item.id === gameId);

  dispatch({ type: "EDIT_CART", payload: game[0] });
};

export const deleteGameInCart =
  (userId, gameId, values) => async (dispatch) => {
    await games.patch(`/cart/${userId}`, values);

    dispatch({ type: "DELETE_GAME_IN_CART", payload: gameId });
  };

export const deleteCart = (userId) => async (dispatch) => {
  await games.delete(`/cart/${userId}`);

  dispatch({ type: "DELETE_CART" });
};

// 訂單處理
export const fetchOrders = (userId) => async (dispatch) => {
  const res = await games.get(`/order?userId=${userId}`);

  dispatch({ type: "FETCH_ORDERS", payload: res.data });
};

export const addToOrder = (values) => async (dispatch) => {
  const res = await games.post("/order", values);

  dispatch({ type: "ADD_TO_ORDER", payload: res.data });
};

export const clearOrder = () => {
  return { type: "CLEAR_ORDER" };
};
