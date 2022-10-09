import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import nomenclatureSlice from './nomenclatureSlice';
import historyRequestSlice from './historyRequestSlice';
import learnSlice from './learnSlice';
import ipClientSlice from './ipClientSlice';
import usersSlice from './usersSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  nomenclature: nomenclatureSlice,
  history_request: historyRequestSlice,
  learn: learnSlice,
  ip_client: ipClientSlice,
  users: usersSlice
});

export const setupStore = () => { return configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});
}
