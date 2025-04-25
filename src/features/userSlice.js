import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: {
      reducer: (state, action) => {
        state.user = action.payload;
        state.error = null;
      },
      prepare: (userData) => ({
        payload: userData,
      }),
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError } = userSlice.actions;

// Memoized selectors
const selectUserState = (state) => state.user;

export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);

export const selectError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

export default userSlice.reducer;
