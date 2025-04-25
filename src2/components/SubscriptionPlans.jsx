import React, { useState, useEffect } from "react";
import SubscriptionForm from "./SubscriptionForm";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const planIds = [
    {
      id: "plan_QNJbXCxcIeS0Xe",
      name: "Premium Plan",
      amount: 99900, // ₹999
      period: "month",
      interval: 1,
      description: "Premium features with priority support",
    },
    {
      id: "plan_QNJbJAJPtk6rXI",
      name: "Standard Plan",
      amount: 49900, // ₹499
      period: "month",
      interval: 1,
      description: "Standard features for growing businesses",
    },
    {
      id: "plan_QNJawsZKl5cmg3",
      name: "Basic Plan",
      amount: 29900, // ₹299
      period: "month",
      interval: 1,
      description: "Essential features for small businesses",
    },
    {
      id: "plan_QNJakFHnJIM96l",
      name: "Mobile Plan",
      amount: 19900, // ₹199
      period: "month",
      interval: 1,
      description: "Mobile-focused features for on-the-go",
    },
    {
      id: "plan_QNJXayOhkfUXPG",
      name: "Test Plan",
      amount: 9900, // ₹99
      period: "month",
      interval: 1,
      description: "Test plan for development",
    },
  ];

  console.log("Raw Plan Data:", planIds);

  // Since we can't make direct API calls due to CORS, we'll use the local data
  useEffect(() => {
    try {
      setLoading(true);
      const formattedPlans = planIds.map((plan) => ({
        id: plan.id,
        displayName: plan.name,
        description: plan.description,
        item: {
          amount: plan.amount,
        },
        period: plan.period,
        interval: plan.interval,
      }));
      console.log("All Formatted Plans:", formattedPlans);
      setPlans(formattedPlans);
      setError(null);
    } catch (err) {
      setError("Failed to load subscription plans");
      console.error("Error loading plans:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  if (loading) {
    return <div className="loading">Loading subscription plans...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  console.log("Final Rendered Plans:", plans);

  return (
    <div className="container">
      <h2>Subscription Plans</h2>
      <div className="plans-grid">
        {plans.map((plan) => {
          console.log(`Rendering Plan - ${plan.displayName}:`, {
            id: plan.id,
            name: plan.displayName,
            amount: plan.item.amount,
            formattedAmount: (plan.item.amount / 100).toFixed(2),
            period: plan.period,
            interval: plan.interval,
          });

          return (
            <div key={plan.id} className="plan-card">
              <h3>{plan.displayName}</h3>
              <div className="plan-price">
                ₹{(plan.item.amount / 100).toFixed(2)}
                <span>/{plan.period}</span>
              </div>
              <div className="plan-details">
                <p>{plan.description}</p>
                <p>Period: {plan.period}</p>
                <p>Interval: {plan.interval}</p>
              </div>
              <button
                className="select-plan-button"
                onClick={() => handleSelectPlan(plan)}
              >
                Select Plan
              </button>
            </div>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="subscription-form-container">
          <h3>Subscribe to {selectedPlan.displayName}</h3>
          <p className="plan-description">{selectedPlan.description}</p>
          <div className="selected-plan-details">
            <p className="price">
              Price: ₹{(selectedPlan.item.amount / 100).toFixed(2)}/
              {selectedPlan.period}
            </p>
          </div>
          <SubscriptionForm plan={selectedPlan} />
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
