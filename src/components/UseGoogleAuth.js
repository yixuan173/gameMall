import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { KEY } from "../config";

import {
  signIn,
  signOut,
  fetchCart,
  clearCart,
  fetchOrders,
  clearOrder,
} from "../actions";

function UseGoogleAuth() {
  const [auth, setAuth] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let auth;

    // 處理登入狀態改變
    const onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
        dispatch(signIn(auth.currentUser.get().getId()));
        dispatch(fetchCart(auth.currentUser.get().getId()));
        dispatch(fetchOrders(auth.currentUser.get().getId()));
      } else {
        dispatch(signOut());
        dispatch(clearCart());
        dispatch(clearOrder());
      }
    };

    // gapi 載入
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: KEY,
          scope: "email",
          plugin_name: "streamy",
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          setAuth(auth);
          onAuthChange(auth.isSignedIn.get());
          // 監聽登入狀態變化
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  return auth;
}

export default UseGoogleAuth;
