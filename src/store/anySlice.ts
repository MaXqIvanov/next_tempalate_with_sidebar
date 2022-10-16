import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const anyAsyncThynk = createAsyncThunk(
  'anySlice/anyAsyncThynk',
  async (params:any, {getState}:any) => {
    console.log(params);
    const response = await api.get(`backend/api/accounts/users/?search=${params.search}&page=${getState().users.current_page}&ordering=${params.ordering}`)
    return {response, params}
  },
)

const anySlice = createSlice({
  name: 'anySlice',
  initialState: {
    loading: false,
    current_page: 1
  },
  reducers: {
    anyReducer(state, action) {
      console.log(action.payload);
      // state.choose_user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(anyAsyncThynk.pending, (state: anySlice, action) => {
        state.loading = true
    });
    builder.addCase(anyAsyncThynk.fulfilled, (state: anySlice,  { payload }) => {
      state.loading = false
    });
    builder.addCase(anyAsyncThynk.rejected, (state: anySlice) => {
        state.loading = false
    });
  },
});

export default anySlice.reducer;
export const { anyReducer } = anySlice.actions;

export type anySlice = {
  loading: boolean,
  current_page: number
}