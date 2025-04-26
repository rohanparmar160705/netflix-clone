import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import HomeScreen from "./screens/HomeScreen";
import Loader from "./screens/Loader";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [userLoggedInStatusFound, setUserLoggedInStatusFound] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserLoggedInStatusFound(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
    return () => unsubscribe();
  }, [dispatch]);

  if (!userLoggedInStatusFound) {
    return <Loader />;
  }

  return (
    <div className="app">
      <Router>
        <SubscriptionProvider>
          {!user ? (
            <LoginScreen />
          ) : (
            <Switch>
              <Route exact path="/profile">
                <ProfileScreen />
              </Route>
              <ProtectedRoute exact path="/" component={HomeScreen} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          )}
        </SubscriptionProvider>
      </Router>
    </div>
  );
}

export default App;
