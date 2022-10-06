import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (params) => {
    const token = Cookies.get('token')
    const response = await api.get(`/users?token=${token}`)
    return {response, params}
  },
)

export const userAuth = createAsyncThunk(
    'auth/userRegistration',
    async (params) => {
      const response = await api(`users?email=${params.email}&password=${params.password}`)
      return {response, params}
    },
  )

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    nomenclature_nav: 1,

  },
  reducers: {
    changeNomenclature(state, action) { 
        console.log(action.payload);
        state.nomenclature_nav = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getProfile.fulfilled, (state,  { payload }) => {
        state.loading = false
        if(payload.response.data?.length == 0){
            payload.params('/auth')
        }else {
            state.auth = true
            state.user = payload.response.data[0]
        }
        
    });
    builder.addCase(getProfile.rejected, (state) => {
        state.loading = false
    });
  },
});

export default authSlice.reducer;
export const { changeNomenclature } = authSlice.actions;