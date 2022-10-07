import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const getNomenclature = createAsyncThunk(
  'auth/getNomenclature',
  async (params) => {
    const response = await api(`backend/api/parser/nomenclatures/?page=${params}`)
    return {response, params}
  },
)

export const getNomenclatureTree = createAsyncThunk(
  'auth/getNomenclatureTree',
  async (params) => {
    const response = await api(`backend/api/parser/nomenclatures/?page=${params}&expand_keys=1`)
    return {response, params}
  },
)

export const editNomenclatureTree = createAsyncThunk(
  'auth/editNomenclatureTree',
  async (params) => {
    const response = await api.put(`backend/api/parser/nomenclatures/${params.id}/`,{
      code: params.code,
      name: params.name
    })
    return {response, params}
  },
)

export const createNomenclatureTree = createAsyncThunk(
  'auth/createNomenclatureTree',
  async (params) => {
    const response = await api.post(`backend/api/parser/nomenclatures/`,{
      code: params.code,
      name: params.name
    })
    return {response, params}
  },
)

export const deleteNomenclatureTree = createAsyncThunk(
  'auth/deleteNomenclatureTree',
  async (params) => {
    const response = await api.delete(`backend/api/parser/nomenclatures/${params.id}/`)
    return {response, params}
  },
)

export const getNomenclatureKeys = createAsyncThunk(
  'auth/getNomenclatureKeys',
  async (params) => {
    const response = await api.get(`backend/api/parser/keys/?nomenclature=${params}`)
    return {response, params}
  },
)

export const changeNomenclatureKeys = createAsyncThunk(
  'auth/changeNomenclatureKeys',
  async (params) => {
    console.log(params);
    const response = await api.put(`backend/api/parser/keys/${params.id}/`,{
      nomenclature: params.nomenclature,
      string: params.string
    })
    return {response, params}
  },
)

export const deleteNomenclatureKeys = createAsyncThunk(
  'auth/deleteNomenclatureKeys',
  async (params) => {
    console.log(params);
    const response = await api.delete(`backend/api/parser/keys/${params.id}/`)
    return {response, params}
  },
)

export const createNomenclatureKeys = createAsyncThunk(
  'auth/createNomenclatureKeys',
  async (params) => {
    console.log(params);
    const response = await api.post(`backend/api/parser/keys/`,{
      nomenclature: params.id,
      string: params.string
    })
    return {response, params}
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    nomenclature_nav: 1,
    nomenclature_all: [],
    nomenclature_tree: [],
    change_nomenclature: true,
    // pagination
    count_page: 1,
    current_page: 1,

    // pagination_tree
    count_page_tree: 1,
    current_page_tree: 1,
    
    nomenclature_edit: {},
    nomenclature_keys: [],
  },
  reducers: {
    changeNomenclature(state, action) { 
        console.log(action.payload);
        state.nomenclature_nav = action.payload
    },
    setNomenclatureEdit(state, action) {
      console.log(action.payload);
      state.nomenclature_edit = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getNomenclature.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getNomenclature.fulfilled, (state,  { payload }) => {
      console.log(payload);
      if(payload){
        state.count_page = Math.round(payload.response.data.count / 30)
        state.nomenclature_all = payload.response.data.results
      }
      state.loading = false
    });
    builder.addCase(getNomenclature.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(getNomenclatureTree.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(getNomenclatureTree.fulfilled, (state,  { payload }) => {
      console.log(payload);
      if(payload){
        state.count_page_tree = Math.round(payload.response.data.count / 30)
        state.nomenclature_tree = payload.response.data.results
      }
      state.loading = false
    });
    builder.addCase(getNomenclatureTree.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(editNomenclatureTree.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(editNomenclatureTree.fulfilled, (state,  { payload }) => {
      console.log(payload);
      if(payload){
        state.change_nomenclature = !state.change_nomenclature
      }
      state.loading = false
    });
    builder.addCase(editNomenclatureTree.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(createNomenclatureTree.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(createNomenclatureTree.fulfilled, (state,  { payload }) => {
      console.log(payload);
      if(payload){
        state.nomenclature_edit = payload.response.data
        state.change_nomenclature = !state.change_nomenclature
      }
      if(payload.response.status === 400){
        alert(payload.response.data.code[0])
      }
      state.loading = false
    });
    builder.addCase(createNomenclatureTree.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(deleteNomenclatureTree.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(deleteNomenclatureTree.fulfilled, (state,  { payload }) => {
      console.log(payload);
      if(payload.response.status === 400){
        alert(payload.response.data.code[0])
      }else{
        state.change_nomenclature = !state.change_nomenclature
        payload.params.nav(false)
      }
      state.loading = false
    });
    builder.addCase(deleteNomenclatureTree.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(getNomenclatureKeys.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(getNomenclatureKeys.fulfilled, (state,  { payload }) => {
      console.log(payload);
      state.nomenclature_keys = payload.response.data.results
      state.loading = false
    });
    builder.addCase(getNomenclatureKeys.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(changeNomenclatureKeys.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(changeNomenclatureKeys.fulfilled, (state,  { payload }) => {
      console.log(payload);
      // state.nomenclature_keys = payload.response.data.results
      state.loading = false
    });
    builder.addCase(changeNomenclatureKeys.rejected, (state) => {
        state.loading = false
    });

    builder.addCase(deleteNomenclatureKeys.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(deleteNomenclatureKeys.fulfilled, (state,  { payload }) => {
      console.log(payload);
      if(payload.response.status === 204){
        state.nomenclature_keys = state.nomenclature_keys.filter((elem)=> elem.id !== payload.params.id)
      }
      // state.nomenclature_keys = payload.response.data.results
      state.loading = false
    });
    builder.addCase(deleteNomenclatureKeys.rejected, (state) => {
        state.loading = false
    });
    // deleteNomenclatureKeys
    builder.addCase(createNomenclatureKeys.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(createNomenclatureKeys.fulfilled, (state,  { payload }) => {
      console.log(payload);
      state.nomenclature_keys = [payload.response.data, ...state.nomenclature_keys]
      
      // if(payload.response.status === 204){}
      // state.nomenclature_keys = payload.response.data.results
      state.loading = false
    });
    builder.addCase(createNomenclatureKeys.rejected, (state) => {
        state.loading = false
    });
    // createNomenclatureKeys
  },
});

export default authSlice.reducer;
export const { changeNomenclature, setNomenclatureEdit } = authSlice.actions;