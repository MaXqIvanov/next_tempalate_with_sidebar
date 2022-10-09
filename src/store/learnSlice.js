import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const getLearn = createAsyncThunk(
  'learn/getLearn',
  async (params, {getState}) => {
    console.log(params.file);
    let data = new FormData()
    data.append('file', params.file)
    const response = await api.post(`backend/api/parser/prepair_learning_data/`, data)
    return {response, params}
  },
)


const learnSlice = createSlice({
  name: 'learn',
  initialState: {
    learn_all: [],
    choose_request: {},
    // pagination
    count_page: 1,
    current_page: 1,
  },
  reducers: {
    chooseRequest(state, action) {
      state.choose_request = action.payload
    },
    setPage(state,action){
      state.current_page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLearn.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getLearn.fulfilled, (state,  { payload }) => {
      console.log(payload); 
      if(payload.response.status === 200){
        // state.count_page = Math.round(payload.response.data.count / 30)
        state.learn_all = payload.response.data
      }
      state.loading = false
    });
    builder.addCase(getLearn.rejected, (state) => {
        state.loading = false
    });

  },
});

export default learnSlice.reducer;
export const { chooseRequest, setPage } = learnSlice.actions;