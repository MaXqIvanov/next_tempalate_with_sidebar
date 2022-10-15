import { combineReducers, configureStore } from '@reduxjs/toolkit';
import anySlice from './anySlice';

const rootReducer = combineReducers({
  anySlice: anySlice,
});

export const setupStore = () => { return configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});
}
