import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const getIpCLient = createAsyncThunk(
  'ip_client/getIpCLient',
  async (params, {getState}) => {
    const response = await api.get(`backend/api/parser/ip_clients/?search=${params.search}&page=${getState().ip_clients.current_page}&ordering=${params.ordering}`)
    return {response, params}
  },
)

export const createIpClient = createAsyncThunk(
  'ip_client/createIpClient',
  async (params, {getState}) => {
    const response = await api.post(`backend/api/parser/ip_clients/`,{
      ipaddr: params.ipaddr,
      allow_string_count: params.allow_string_count,
      iek_client: params.iek_client,
      blocked: params.blocked,
      comment: params.comment
    })
    return {response, params}
  },
)

export const changeIpClient = createAsyncThunk(
  'ip_client/changeIpClient',
  async (params, {getState}) => {
    const response = await api.put(`backend/api/parser/ip_clients/${getState().ip_clients.choose_ip_clients.id}/`,{
      ipaddr: params.ipaddr,
      allow_string_count: params.allow_string_count,
      iek_client: params.iek_client,
      blocked: params.blocked,
      comment: params.comment
    })
    return {response, params}
  },
)

export const deleteIpClient = createAsyncThunk(
  'ip_client/deleteIpClient',
  async (params, {getState}) => {
    const response = await api.delete(`backend/api/parser/ip_clients/${getState().ip_clients.choose_ip_clients.id}/`)
    return {response, params}
  },
)




const ipClientSlice = createSlice({
  name: 'ip_client',
  initialState: {
    ip_clients_all: [],
    choose_ip_clients: {},
    changed_ip_clients: false,
    // pagination
    count_page: 1,
    current_page: 1,
  },
  reducers: {
    chooseRequest(state, action) {
      state.choose_ip_clients = action.payload
    },
    setPage(state,action){
      state.current_page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIpCLient.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getIpCLient.fulfilled, (state,  { payload }) => {
      if(payload.response.status === 200){
        state.count_page = Math.round(payload.response.data.count / 30)
        state.ip_clients_all = payload.response.data.results
      }
      state.loading = false
    });
    builder.addCase(getIpCLient.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(createIpClient.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(createIpClient.fulfilled, (state,  { payload }) => {
      if(payload.response.status === 201){
        state.ip_clients_all = [payload.response.data, ...state.ip_clients_all]
        alert('IP-Клиента было успешно добавлено')
      }else{
        alert('IP-Клиента не получилось добавить')
      }
      state.loading = false
    });
    builder.addCase(createIpClient.rejected, (state) => {
        state.loading = false
    });
    // createIpClient

    builder.addCase(changeIpClient.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(changeIpClient.fulfilled, (state,  { payload }) => {
      if(payload.response.status === 200){
        state.changed_ip_clients = !state.changed_ip_clients
        alert('IP-Клиента было успешно изменено')
      }else{
        alert('IP-Клиента не получилось изменить')
      }
      state.loading = false
    });
    builder.addCase(changeIpClient.rejected, (state) => {
        state.loading = false
    });

    // deleteIpClient
    builder.addCase(deleteIpClient.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(deleteIpClient.fulfilled, (state,  { payload }) => {
      if(payload.response.status === 204){
        state.ip_clients_all = state.ip_clients_all.filter((elem)=> elem.id !== state.choose_ip_clients.id)
        payload.params.isVisibleSidebar(false)
      }else{
        alert('IP-Клиента не получилось удалить')
      }
      state.loading = false
    });
    builder.addCase(deleteIpClient.rejected, (state) => {
        state.loading = false
    });
  },
});

export default ipClientSlice.reducer;
export const { chooseRequest, setPage } = ipClientSlice.actions;