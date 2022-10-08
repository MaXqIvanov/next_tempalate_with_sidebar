import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import nomenclatureSlice from './nomenclatureSlice';
import historyRequestSlice from './historyRequestSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  nomenclature: nomenclatureSlice,
  history_request: historyRequestSlice,
  
});

export const setupStore = () => { return configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});
}
