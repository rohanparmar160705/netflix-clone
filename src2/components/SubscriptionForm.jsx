import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SubscriptionForm = ({ plan }) => {
  const { currentUser, updateUserSubscription } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: currentUser?.email || "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        plan_id: plan.id,
        name: "Your Company Name",
        description: `Subscribe to ${plan.displayName}`,
        image: "your_logo_url",
        amount: plan.item.amount,
        currency: "INR",
        subscription_card_change: true,
        recurring: 1,
        handler: async function (response) {
          console.log("Payment Success Response:", response);
          await updateUserSubscription(true);
          alert(
            "Payment Successful! Payment ID: " + response.razorpay_payment_id
          );
          navigate("/home");
        },
        prefill: {
          name: formData.name,
          email: currentUser.email,
          contact: formData.phone,
        },
        notes: {
          plan_name: plan.displayName,
          user_id: currentUser.uid,
        },
        theme: {
          color: "#4f46e5",
        },
        modal: {
          confirm_close: true,
          ondismiss: function () {
            setLoading(false);
          },
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
        timeout: 300,
      };

      console.log("Razorpay Options:", options);

      const razorpayInstance = new window.Razorpay(options);

      // Add event handlers
      razorpayInstance.on("payment.failed", function (response) {
        console.error("Payment Failed:", response.error);
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      razorpayInstance.on("payment.error", function (error) {
        console.error("Payment Error:", error);
        setError("An error occurred during payment. Please try again.");
        setLoading(false);
      });

      razorpayInstance.open();
    } catch (err) {
      console.error("Error initiating payment:", err);
      setError("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="subscription-form">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Enter your full name"
          minLength="3"
          maxLength="50"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={currentUser.email}
          disabled
          className="disabled-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          placeholder="Enter your phone number"
          pattern="[0-9]{10}"
          title="Please enter a valid 10-digit phone number"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Processing..." : "Subscribe Now"}
      </button>

      <p className="test-mode-notice">
        This is running in test mode. Use test card: 4111 1111 1111 1111
      </p>
    </form>
  );
};

export default SubscriptionForm;
