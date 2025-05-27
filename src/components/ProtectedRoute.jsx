/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSubscription } from "../contexts/SubscriptionContext";
import Loader from "../screens/Loader";

// Define a new component called ProtectedRoute
// It takes a 'component' (renamed as Component) and any other props (...rest)
function ProtectedRoute({ component: Component, ...rest }) {
  // Get subscription info and loading status from custom hook
  const { hasActiveSubscription, loading } = useSubscription();

  // If still loading subscription status, show the loading screen
  if (loading) {
    return <Loader />;
  }

  // Once loading is done:
  return (
    <Route
      {...rest} // Spread any other props like 'path', 'exact', etc.
      render={(props) =>
        hasActiveSubscription ? (
          // If user has an active subscription, render the requested component
          <Component {...props} />
        ) : (
          // Otherwise, redirect the user to the profile page
          <Redirect
            to={{
              pathname: "/profile", // Redirect path
              state: { from: props.location }, // Save where the user was trying to go
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
