import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../features/userSlice";
import MiniLoader from "./MiniLoader";
import "./PlansScreen.css";

function PlansScreen() {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [miniLoaderState, setMiniLoaderState] = useState(true);

  const loadSubscriptions = (plans) => {
    fetch(
      "https://limitless-ravine-50377.herokuapp.com/loadSubscriptions/" +
        user.email
    )
      .then((res) => res.json())
      .then((subscriptions) => {
        setProducts(plans);
        if (subscriptions) {
          setSubscriptionDetails(subscriptions[0]?.subscriptionDetails);
        }
        setMiniLoaderState(false);
      });
  };

  useEffect(() => {
    fetch("https://limitless-ravine-50377.herokuapp.com/loadPlans")
      .then((res) => res.json())
      .then((plans) => {
        loadSubscriptions(plans);
      });
  }, []);

  const loadCheckout = (productId) => {
    history.push("/payment/" + productId);
  };
  return (
    <div style={{ position: "relative" }}>
      {miniLoaderState ? (
        <MiniLoader />
      ) : (
        <div className="planScreen">
          {subscriptionDetails?.map((subscriptionDetail) => {
            return (
              <h6>
                Renewal date ({subscriptionDetail.planRole}):{" "}
                {new Date(subscriptionDetail.renewTime).toLocaleDateString()}
              </h6>
            );
          })}
          {products.map((product) => {
            return (
              <div className="planScreen__plan">
                <div className="planScreen__info">
                  <h5>{product.name}</h5>
                  <h6>{product.description}</h6>
                </div>
                {subscriptionDetails?.find(
                  (subscription) => subscription.planId === product.id
                ) ? (
                  <button className="planScreen__btn__currentPackage">
                    Current Package
                  </button>
                ) : (
                  <button
                    className="planScreen__btn__subscribe"
                    onClick={() => loadCheckout(product.id)}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PlansScreen;
