import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSubscription } from "../contexts/SubscriptionContext";
import Loader from "../screens/Loader";

// eslint-disable-next-line no-unused-vars
function ProtectedRoute({ component: Component, ...rest }) {
  const { hasActiveSubscription, loading } = useSubscription();

  if (loading) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        hasActiveSubscription ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
