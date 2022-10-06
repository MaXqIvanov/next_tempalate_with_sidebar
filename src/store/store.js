import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
});

export const setupStore = () => { return configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});
}
