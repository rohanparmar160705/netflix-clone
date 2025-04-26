import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebase";

const SubscriptionContext = createContext();

export function useSubscription() {
  return useContext(SubscriptionContext);
}

export function SubscriptionProvider({ children }) {
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector(selectUser);

  const fetchSubscription = async (userId) => {
    if (!userId) {
      console.error("No user ID provided to fetchSubscription");
      return null;
    }

    try {
      const subscriptionRef = doc(db, "subscriptions", userId);
      const subscriptionDoc = await getDoc(subscriptionRef);

      if (subscriptionDoc.exists()) {
        const data = subscriptionDoc.data();
        console.log("Fetched subscription data:", data);

        // Convert timestamps to dates where needed
        const processedData = {
          ...data,
          startDate: data.startDate?.toDate?.() || data.startDate,
          endDate: data.endDate,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
        };

        setHasActiveSubscription(processedData.active);
        setSubscriptionDetails(processedData);
        return processedData;
      } else {
        console.log("No subscription found for user:", userId);
        setHasActiveSubscription(false);
        setSubscriptionDetails(null);
        return null;
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
      setError("Failed to fetch subscription details");
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const checkSubscription = async () => {
      if (!user?.uid) {
        if (isMounted) {
          setHasActiveSubscription(false);
          setSubscriptionDetails(null);
          setError(null);
          setLoading(false);
        }
        return;
      }

      try {
        console.log("Checking subscription for user:", user.uid);
        await fetchSubscription(user.uid);
        if (isMounted) {
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error checking subscription:", error);
          setError("Failed to load subscription details");
          setHasActiveSubscription(false);
          setSubscriptionDetails(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkSubscription();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const updateSubscription = async (planDetails) => {
    if (!user?.uid) {
      setError("User not authenticated");
      return false;
    }

    setLoading(true);
    try {
      console.log("Updating subscription with plan details:", planDetails);

      // Calculate the end date (30 days from now)
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);

      // Create subscription data
      const subscriptionData = {
        userId: user.uid,
        email: user.email,
        active: true,
        planId: planDetails.id,
        planName: planDetails.name,
        price: planDetails.price,
        startDate: serverTimestamp(),
        endDate: endDate.toISOString(),
        paymentId: planDetails.paymentId,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      };

      // Update user document with hasSubscription flag
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          email: user.email,
          hasSubscription: true,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      console.log("User document updated with subscription status");

      // Update subscription document
      const subscriptionRef = doc(db, "subscriptions", user.uid);
      await setDoc(subscriptionRef, subscriptionData);
      console.log("Subscription document created in Firestore");

      // Verify the updates
      const [updatedSubscription, updatedUser] = await Promise.all([
        fetchSubscription(user.uid),
        getDoc(userRef),
      ]);

      if (
        !updatedSubscription?.active ||
        !updatedUser.data()?.hasSubscription
      ) {
        throw new Error("Failed to verify subscription update");
      }

      console.log(
        "Subscription and user data updated and verified successfully"
      );
      setError(null);
      return true;
    } catch (error) {
      console.error("Error updating subscription:", error);
      setError(error.message || "Failed to update subscription");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    hasActiveSubscription,
    loading,
    subscriptionDetails,
    updateSubscription,
    error,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}
