import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebase";

// Create a context for subscription information
const SubscriptionContext = createContext();

// Custom hook to use the SubscriptionContext easily elsewhere
export function useSubscription() {
  return useContext(SubscriptionContext);
}

// Provider component to wrap parts of the app that need subscription data
export function SubscriptionProvider({ children }) {
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [error, setError] = useState(null);

  // Get the currently logged-in user from Redux
  const user = useSelector(selectUser);

  // Function to fetch subscription details from Firestore
  const fetchSubscription = async (userId) => {
    if (!userId) {
      console.error("No user ID provided to fetchSubscription");
      return null;
    }

    try {
      // Reference to the user's subscription document
      const subscriptionRef = doc(db, "subscriptions", userId);
      const subscriptionDoc = await getDoc(subscriptionRef);

      if (subscriptionDoc.exists()) {
        // If subscription data exists, process it
        const data = subscriptionDoc.data();
        console.log("Fetched subscription data:", data);

        // Convert Firestore timestamps to JS Date objects if needed
        const processedData = {
          ...data,
          startDate: data.startDate?.toDate?.() || data.startDate,
          endDate: data.endDate,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
        };

        // Update state with subscription details
        setHasActiveSubscription(processedData.active);
        setSubscriptionDetails(processedData);
        return processedData;
      } else {
        // If no subscription is found
        console.log("No subscription found for user:", userId);
        setHasActiveSubscription(false);
        setSubscriptionDetails(null);
        return null;
      }
    } catch (error) {
      // Handle any errors
      console.error("Error fetching subscription:", error);
      setError("Failed to fetch subscription details");
      return null;
    }
  };

  // Effect to fetch subscription automatically when the user changes
  useEffect(() => {
    let isMounted = true; // Flag to avoid updating state after unmount

    const checkSubscription = async () => {
      if (!user?.uid) {
        // If no user is logged in
        if (isMounted) {
          setHasActiveSubscription(false);
          setSubscriptionDetails(null);
          setError(null);
          setLoading(false);
        }
        return;
      }

      try {
        // Fetch subscription if user is available
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
          setLoading(false); // Always stop loading
        }
      }
    };

    checkSubscription();

    // Cleanup function when component unmounts
    return () => {
      isMounted = false;
    };
  }, [user]); // Runs when `user` changes

  // Function to update the user's subscription details in Firestore
  const updateSubscription = async (planDetails) => {
    if (!user?.uid) {
      setError("User not authenticated");
      return false;
    }

    setLoading(true);
    try {
      console.log("Updating subscription with plan details:", planDetails);

      // Set end date 30 days from now
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);

      // Prepare subscription data object
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
        { merge: true } // Merge with existing user data
      );
      console.log("User document updated with subscription status");

      // Update subscription document
      const subscriptionRef = doc(db, "subscriptions", user.uid);
      await setDoc(subscriptionRef, subscriptionData);
      console.log("Subscription document created in Firestore");

      // Fetch updated data to verify the subscription update
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
      return true; // Success
    } catch (error) {
      console.error("Error updating subscription:", error);
      setError(error.message || "Failed to update subscription");
      return false; // Failure
    } finally {
      setLoading(false); // Always stop loading at the end
    }
  };

  // Value that will be shared via context
  const value = {
    hasActiveSubscription,
    loading,
    subscriptionDetails,
    updateSubscription,
    error,
  };

  // Provide the subscription context to children components
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}
