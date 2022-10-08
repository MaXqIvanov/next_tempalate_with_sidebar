import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const getHistoryRequest = createAsyncThunk(
  'history_request/getHistoryRequest',
  async (params, {getState}) => {
    const response = await api(`backend/api/parser/search_requests/?search=${params.search}&page=${getState().history_request.current_page}`)
    return {response, params}
  },
)

export const getHistoryRequestResults = createAsyncThunk(
    'history_request/getHistoryRequestResults',
    async (params, {getState}) => {
      const response = await api(`backend/api/parser/search_requests_results/?search=${params.search}&page=${getState().history_request.current_page_results}&search_request=${getState().history_request.choose_request.id}`)
      return {response, params}
    },
  )
// 

const historyRequestSlice = createSlice({
  name: 'history_request',
  initialState: {
    history_request_all: [],
    choose_request: {},
    // pagination
    count_page: 1,
    current_page: 1,

    // history_request_results
    history_request_results: [],

    // pagination
    count_page_results: 1,
    current_page_results: 1,
  },
  reducers: {
    chooseRequest(state, action) {
      state.choose_request = action.payload
    },
    setPage(state,action){
      state.current_page = action.payload
    },
    setPageResults(state,action){
        state.count_page_results = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getHistoryRequest.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getHistoryRequest.fulfilled, (state,  { payload }) => {
      console.log(payload); 
      if(payload.response.status === 200){
        state.count_page = Math.round(payload.response.data.count / 30)
        state.history_request_all = payload.response.data.results
      }
      state.loading = false
    });
    builder.addCase(getHistoryRequest.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(getHistoryRequestResults.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getHistoryRequestResults.fulfilled, (state,  { payload }) => {
      console.log(payload); 
      if(payload.response.status === 200){
        state.count_page_results = Math.round(payload.response.data.count / 30)
        state.history_request_results = payload.response.data.results
      }
      state.loading = false
    });
    builder.addCase(getHistoryRequestResults.rejected, (state) => {
        state.loading = false
    });
  },
});

export default historyRequestSlice.reducer;
export const { chooseRequest, setPage } = historyRequestSlice.actions;