import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import GameList from "./games/GameList";
import GameDetail from "./games/GameDetail";
import Cart from "./games/Cart";
import Order from "./games/Order";
import OrderDetail from "./games/Order/OrderDetail";
import history from "../history";
import Header from "./Header";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Noto Sans TC", "Roboto"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Header />
        <Container maxWidth="md" sx={{ marginTop: "2.5rem" }}>
          <Switch>
            <Route path="/" exact component={GameList} />
            <Route path="/games/:id" exact component={GameDetail} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/order" exact component={Order} />
            <Route path="/order/:id" exact component={OrderDetail} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
