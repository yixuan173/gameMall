import CartList from "./CartList";
import CartForm from "./CartForm";

import { Grid } from "@mui/material";

const Cart = () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={7}>
        <CartList />
      </Grid>
      <Grid item md={5}>
        <CartForm />
      </Grid>
    </Grid>
  );
};

export default Cart;
