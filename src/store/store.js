import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import nomenclatureSlice from './nomenclatureSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  nomenclature: nomenclatureSlice,
  
});

export const setupStore = () => { return configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});
}
