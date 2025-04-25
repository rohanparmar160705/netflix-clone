import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['user/login'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.auth'],
        // Ignore these paths in the state
        ignoredPaths: ['user.user'],
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
});
