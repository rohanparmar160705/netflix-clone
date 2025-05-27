// Import necessary functions from Redux Toolkit
import { createSlice, createSelector } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  user: null,   // Holds user data after login
  error: null,  // Holds any error messages related to user actions
};

// Create a slice of the Redux store specifically for user-related state
export const userSlice = createSlice({
  name: "user",           // Name of the slice
  initialState,           // Initial state defined above
  reducers: {             // Reducer functions to handle state changes

    // Handles user login
    login: {
      reducer: (state, action) => {
        state.user = action.payload;  // Set user data from payload
        state.error = null;           // Clear any existing error
      },
      prepare: (userData) => ({
        payload: userData,            // Prepare user data for the reducer
      }),
    },

    // Handles user logout
    logout: (state) => {
      state.user = null;              // Clear user data
      state.error = null;             // Clear any existing error
    },

    // Handles setting an error message
    setError: (state, action) => {
      state.error = action.payload;   // Set error from payload
    },
  },
});

// Export the action creators (login, logout, setError) for use in components
export const { login, logout, setError } = userSlice.actions;

// --- Selectors ---

// Base selector to access the user slice from the Redux store
const selectUserState = (state) => state.user;

// Memoized selector to get just the user object from state
export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);

// Memoized selector to get any error related to the user
export const selectError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

// Export the reducer to include it in the store configuration
export default userSlice.reducer;
  