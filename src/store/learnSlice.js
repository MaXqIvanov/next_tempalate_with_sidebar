import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const getLearn = createAsyncThunk(
  'learn/getLearn',
  async (params, {getState}) => {
    let data = new FormData()
    data.append('file', params.file)
    const response = await api.post(`backend/api/parser/prepair_learning_data/`, data)
    return {response, params}
  },
)

export const sendLearn = createAsyncThunk(
    'learn/sendLearn',
    async (params, {getState}) => {
    //   let new_params = [{...params[0]},{...params[1]}]
      const response = await api.post(`backend/api/parser/system_learning/`, params)
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
      }else{
        if(payload.response.data.detail){
          alert(payload.response.data.detail)
        }
      }
      state.loading = false
    });
    builder.addCase(getLearn.rejected, (state) => {
        state.loading = false
    });
    // sendLearn
    builder.addCase(sendLearn.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(sendLearn.fulfilled, (state,  { payload }) => {
      if(payload.response.status === 200){
        // state.count_page = Math.round(payload.response.data.count / 30)
        alert(payload.response.data.detail)
        state.learn_all = []
      }else{
        alert("отправить данные не получилось")
      }
      state.loading = false
    });
    builder.addCase(sendLearn.rejected, (state) => {
        state.loading = false
    });
  },
});

export default learnSlice.reducer;
export const { chooseRequest, setPage } = learnSlice.actions;