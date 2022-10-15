import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (params, {getState}) => {
    console.log(params);
    const response = await api.get(`backend/api/accounts/users/?search=${params.search}&page=${getState().users.current_page}&ordering=${params.ordering}`)
    return {response, params}
  },
)

export const createUser = createAsyncThunk(
  'users/createUser',
  async (params, {getState}) => {
    let data = new FormData()
    data.append('username', params.username)
    data.append('email', params.email)
    data.append('name', params.name)
    data.append('avatar', params.avatar)
    data.append('is_active', params.is_active)
    data.append('password', params.password)
    const response = await api.post(`backend/api/accounts/users/`, data)
    return {response, params}
  },
)

export const changeUser = createAsyncThunk(
  'users/changeUser',
  async (params, {getState}) => {
    console.log(params);
    let data2 = new FormData()
    data2.append('username', params.username)
    data2.append('email', params.email)
    data2.append('name', params.name)
    if(params.avatar.size){
    data2.append('avatar', params.avatar)
    }
    data2.append('is_active', params.is_active)
    const response = await api.put(`backend/api/accounts/users/${getState().users.choose_user.id}/`, data2)
    return {response, params}
  },
)

export const changePassword = createAsyncThunk(
  'users/changePassword',
  async (params, {getState}) => {
    console.log(params);
    const response = await api.post(`backend/api/accounts/users/${getState().users.choose_user.id}/change_password/`,{
      password: params.password
    })
    return {response, params}
  },
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (params, {getState}) => {
    console.log(params);
    const response = await api.delete(`backend/api/accounts/users/${getState().users.choose_user.id}/`)
    return {response, params}
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users_all: [],
    choose_user: {},
    change_info_user: false,
    // pagination
    count_page: 1,
    current_page: 1,
  },
  reducers: {
    chooseRequest(state, action) {
      console.log(action.payload);
      state.choose_user = action.payload
    },
    setPage(state,action){
      state.current_page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getUsers.fulfilled, (state,  { payload }) => {
      console.log(payload); 
      if(payload?.response?.status === 200){
        state.count_page = Math.round(payload.response.data.count / 30)
        state.users_all = payload.response.data.results
      }
      state.loading = false
    });
    builder.addCase(getUsers.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(createUser.fulfilled, (state,  { payload }) => {
      console.log(payload); 
      if(payload.response.status === 200){
        state.users_all = [...state.users_all, payload.response.data]
        alert('Пользователь успешно добавлен')
      }else{
        alert(payload?.response?.data?.username[0])
      }
      state.loading = false
    });
    builder.addCase(createUser.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(changeUser.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(changeUser.fulfilled, (state,  { payload }) => {
      console.log(payload); 
      if(payload.response.status === 200){
        state.change_info_user = !state.change_info_user
        alert('Данные успешно обновлены')
      }else{
        alert(payload.response.data.username[0])
      }
      state.loading = false
    });
    builder.addCase(changeUser.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(deleteUser.fulfilled, (state,  { payload }) => {
      console.log(payload); 
      if(payload.response.status === 204){
        state.change_info_user = !state.change_info_user
        payload.params.isSidebar(false)
        alert('Пользователь успешно удалён')
      }else{
        alert('Удалить не получилось')
      }
      state.loading = false
    });
    builder.addCase(deleteUser.rejected, (state) => {
        state.loading = false
    });

    // changePassword
    builder.addCase(changePassword.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(changePassword.fulfilled, (state,  { payload }) => {
      console.log(payload); 
      if(payload.response.status === 200){
        alert("Пароли успешно изменены")
        payload.params.isVisiblePassword(false)
      }else{
        alert(payload.response.data.detail)
      }
      state.loading = false
    });
    builder.addCase(changePassword.rejected, (state) => {
        state.loading = false
    });
  },
});

export default usersSlice.reducer;
export const { chooseRequest, setPage } = usersSlice.actions;