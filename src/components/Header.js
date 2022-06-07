import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GooaleAuth from "./GooaleAuth";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Badge,
  IconButton,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const Header = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const cartLength = useSelector((state) => Object.values(state.cart).length);
  const orderLength = useSelector((state) => Object.values(state.order).length);

  const checkIsSignIn = () => {
    if (isSignedIn) {
      return (
        <>
          <Link to={"/cart"}>
            <IconButton size="large" sx={{ color: "#e03131" }}>
              <Badge badgeContent={cartLength} color="error" showZero>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>

          <Link to={"/order"}>
            <IconButton size="large" sx={{ color: "#e03131" }}>
              <Badge badgeContent={orderLength} color="error" showZero>
                <AssignmentOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff", opacity: "95%" }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: "#e03131", textDecoration: "none" }}>
            Nintendo
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ marginRight: "15px" }}>{checkIsSignIn()}</Box>
        <GooaleAuth />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
