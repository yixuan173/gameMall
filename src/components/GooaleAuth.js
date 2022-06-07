import { useSelector } from "react-redux";
import UseGoogleAuth from "./UseGoogleAuth";

import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";

const GoogleAuth = () => {
  const auth = UseGoogleAuth();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  function handleSignIn() {
    auth.signIn();
  }

  function handleSignOut() {
    auth.signOut();
  }

  if (isSignedIn === null) {
    return null;
  } else if (isSignedIn === true) {
    return (
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleSignOut}
      >
        <GoogleIcon sx={{ marginRight: "5px", fontSize: "small" }} />
        Sign Out
      </Button>
    );
  } else {
    return (
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleSignIn}
      >
        <GoogleIcon sx={{ marginRight: "5px", fontSize: "small" }} />
        Sign In
      </Button>
    );
  }
};

export default GoogleAuth;
