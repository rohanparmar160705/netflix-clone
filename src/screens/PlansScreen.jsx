import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useSubscription } from "../contexts/SubscriptionContext";
import "./PlansScreen.css";

const plans = [
  {
    id: "basic",
    name: "Basic",
    description: "720p",
    price: 499,
  },
  {
    id: "standard",
    name: "Standard",
    description: "1080p",
    price: 649,
  },
  {
    id: "premium",
    name: "Premium",
    description: "4K + HDR",
    price: 799,
  },
];

function PlansScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(selectUser);
  const { updateSubscription, hasActiveSubscription, subscriptionDetails } =
    useSubscription();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (plan) => {
    setError(null);
    setLoading(true);

    try {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error("Invalid Razorpay configuration");
      }

      const res = await loadRazorpay();
      if (!res) {
        throw new Error("Razorpay SDK failed to load");
      }

      const options = {
        key: razorpayKey,
        amount: plan.price * 100,
        currency: "INR",
        name: "Netflix Clone",
        description: `${plan.name} Plan Subscription`,
        handler: async function (response) {
          try {
            console.log(
              "Payment successful! Payment ID:",
              response.razorpay_payment_id
            );

            // Attempt to update subscription in Firebase
            const success = await updateSubscription({
              ...plan,
              paymentId: response.razorpay_payment_id,
            });

            if (success) {
              console.log("Subscription updated successfully!");
              setError(null);
            } else {
              throw new Error("Failed to update subscription");
            }
          } catch (error) {
            console.error("Subscription update failed:", error);
            setError(
              "Payment successful but subscription activation failed. Please contact support."
            );
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#E50914",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
      setError(
        error.message || "Payment system unavailable. Please try again later."
      );
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Not available";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="plansScreen__loading">Processing your request...</div>
    );
  }

  return (
    <div className="plansScreen">
      {error && <div className="plansScreen__error">{error}</div>}

      {hasActiveSubscription && subscriptionDetails && (
        <div className="plansScreen__subscription">
          <p>
            Current Plan: <strong>{subscriptionDetails.planName}</strong>
          </p>
          <p>Start Date: {formatDate(subscriptionDetails.startDate)}</p>
          <p>Next Billing Date: {formatDate(subscriptionDetails.endDate)}</p>
        </div>
      )}

      <div className="plansScreen__plans">
        {plans.map((plan) => (
          <div key={plan.id} className="plansScreen__plan">
            <div className="plansScreen__info">
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
            <button
              className={`plansScreen__button ${
                subscriptionDetails?.planId === plan.id
                  ? "plansScreen__button--current"
                  : ""
              }`}
              onClick={() => handlePayment(plan)}
              disabled={loading || subscriptionDetails?.planId === plan.id}
            >
              {subscriptionDetails?.planId === plan.id
                ? "Current Plan"
                : `Subscribe ₹${plan.price}/month`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlansScreen;
