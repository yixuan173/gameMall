import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, editCart } from "../../actions";
import history from "../../history";
import { TextField, Stack, Typography, Button, Chip } from "@mui/material";

const GameDetailBuy = ({ game }) => {
  const [amount, setAmount] = useState(1);
  const { isSignedIn, userId } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const onAddToCart = () => {
    if (!isSignedIn) return alert("請先進行登入，在開始購物。");

    const { id, gameName, imgUrl, gamePrice } = game;

    if (!Object.keys(cart).length) {
      const value = {
        id: userId,
        gameList: [
          {
            id,
            gameName,
            imgUrl,
            gamePrice,
            amount: +amount,
            userId,
          },
        ],
      };

      dispatch(addToCart(value));
    } else {
      let gameList;

      if (cart[id]) {
        gameList = Object.values({
          ...cart,
          [id]: { ...cart[id], amount: cart[id].amount + +amount },
        });
      } else {
        gameList = Object.values({
          ...cart,
          [id]: { id, gameName, imgUrl, gamePrice, amount: +amount, userId },
        });
      }

      dispatch(editCart(userId, id, { gameList }));
    }

    alert("已加入購物車");
  };

  const onAddToCartAndGo = () => {
    onAddToCart();

    if (!isSignedIn) return;
    history.push("/cart");
  };

  return (
    <Stack direction="column" spacing={3} alignItems="flex-start">
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "600" }}>
        【NS】{game.gameName} <br />
        <Chip
          label="郵寄滿 2000 免運"
          variant="filled"
          color="primary"
          size="small"
        />
      </Typography>

      <Typography sx={{ fontWeight: "600", color: "#555" }}>
        NT$ {game.gamePrice}
      </Typography>

      <TextField
        id="standard-number"
        label="數量"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        color="primary"
        margin="normal"
        focused
      />

      <Stack direction="row" spacing={5}>
        <Button onClick={onAddToCart} variant="outlined" color="error">
          加入購物車
        </Button>
        <Button onClick={onAddToCartAndGo} variant="contained" color="error">
          立即結帳
        </Button>
      </Stack>
    </Stack>
  );
};

export default GameDetailBuy;
