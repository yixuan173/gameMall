import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editCart, deleteGameInCart, deleteCart } from "../../../actions";

import { Stack, Typography, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartList = () => {
  const cartList = useSelector((state) => Object.values(state.cart));
  const gameList = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let newGameList;
  const onPlusAmount = (id, amount) => {
    amount++;
    newGameList = Object.values({
      ...gameList,
      [id]: { ...gameList[id], amount },
    });

    dispatch(editCart(gameList[id].userId, id, { gameList: newGameList }));
  };

  const onReduceAmount = (id, amount) => {
    if (amount === 1) {
      newGameList = cartList.filter((game) => game.id !== id);

      if (cartList.length === 1) {
        return dispatch(deleteCart(gameList[id].userId));
      }

      return dispatch(
        deleteGameInCart(gameList[id].userId, id, { gameList: newGameList })
      );
    }

    amount--;
    newGameList = Object.values({
      ...gameList,
      [id]: { ...gameList[id], amount },
    });

    dispatch(editCart(gameList[id].userId, id, { gameList: newGameList }));
  };

  const renderCartList = () => {
    if (!cartList.length) return <div>請先選購遊戲片</div>;

    return cartList.map((game) => {
      return (
        <Stack key={game.id} direction="row">
          <Link to={`/games/${game.id}`}>
            <img
              src={game.imgUrl}
              style={{ width: "170px" }}
              alt={game.gameName}
            />
          </Link>
          <Stack sx={{ marginLeft: "0.5rem" }} justifyContent="center">
            <Typography variant="h6">{game.gameName}</Typography>
            <Typography variant="subtitle2">
              數量：
              <IconButton
                size="large"
                disableRipple={true}
                color="error"
                onClick={() => onReduceAmount(game.id, game.amount)}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              {game.amount}
              <IconButton
                size="large"
                disableRipple={true}
                color="error"
                onClick={() => onPlusAmount(game.id, game.amount)}
              >
                <AddCircleOutlineIcon />
              </IconButton>
              金額：{game.gamePrice * game.amount}
            </Typography>
          </Stack>
        </Stack>
      );
    });
  };

  return <Stack spacing={2}>{renderCartList()}</Stack>;
};

export default CartList;
