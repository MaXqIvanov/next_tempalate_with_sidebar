import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (params) => {
    const response = await api.get(`backend/api/accounts/profile/info/`)
    return {response, params}
  },
)

export const userAuth = createAsyncThunk(
    'auth/userAuth',
    async (params) => {
      const response = await api.post(`backend/api/accounts/auth/auth/`,{
        username: params.username,
        password: params.password
      })
      return {response, params}
    },
  )

  export const changeProfile = createAsyncThunk(
    'auth/changeProfile',
    async (params) => {
      console.log(params);
      let data2 = new FormData()
      data2.append('email', params.email)
      data2.append('name', params.name)
      if(params.avatar.size){
      data2.append('avatar', params.avatar)
      }
      const response = await api.post(`backend/api/accounts/profile/change_profile/`,data2)
      return {response, params}
    },
  )

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    auth: false,
    loading: false,
    isVisibleProfile: true,
  },
  reducers: {
    logout(state, action) { 
      state.auth = false
      state.user = {token : '', id: null, username: '', password: '', email: ''}
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getProfile.fulfilled, (state,  { payload }) => {
      if(payload.response.status === 401){
        payload.params.router.push('/sign-in')
      }
      else{
        state.user = payload.response.data
      }
      state.loading = false
    });
    builder.addCase(getProfile.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(userAuth.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(userAuth.fulfilled, (state,  { payload }) => {
        if(payload.response?.status === 403){
          alert(payload.response.data.detail)
        }else{
          Cookies.set('token', payload.response.data.token)
          api.defaults.headers = {
            Authorization: `Bearer ${payload.response.data.token}`
          };
          payload.params.router.push('/')
        }
        state.loading = false
    });
    builder.addCase(userAuth.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(changeProfile.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(changeProfile.fulfilled, (state,  { payload }) => {
        console.log(payload);
        if(payload.response.status === 200){
          alert(payload.response.data.detail)
        }else{
          alert('Изменить данные не получилось')
        }
        // if(payload.response?.status === 403){
        //   alert(payload.response.data.detail)
        // }else{
        //   Cookies.set('token', payload.response.data.token)
        //   api.defaults.headers = {
        //     Authorization: `Bearer ${payload.response.data.token}`
        //   };
        //   payload.params.router.push('/')
        // }
        state.loading = false
    });
    builder.addCase(changeProfile.rejected, (state) => {
        state.loading = false
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;