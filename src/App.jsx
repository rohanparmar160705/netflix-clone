import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import HomeScreen from "./screens/HomeScreen";
import Loader from "./screens/Loader";
import LoginScreen from "./screens/LoginScreen";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const [userLoggedInStatusFound, setUserLoggedInStatusFound] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  setTimeout(() => {
    setUserLoggedInStatusFound(true);
  }, 3000);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //LoggedIn
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //LoggedOut
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!userLoggedInStatusFound ? (
          <Loader />
        ) : !user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route path="/payment/:productId">
              <PaymentScreen />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
