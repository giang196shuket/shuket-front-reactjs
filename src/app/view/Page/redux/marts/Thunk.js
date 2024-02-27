import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/mart";

export const uploadMartLogo = createAsyncThunk(
    'uploadMartLogo',
    async (data,{rejectWithValue}) => {
     
        try {
      
            const formData = new FormData();
            formData.append('field_name', 'image');
            formData.append('image', data);
          
          const response = await Axios.post(`${MAIN_URL}/upload_mart_logo`, formData , {
            headers: { "Content-Type": "multipart/form-data" }
                  })
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  export const getMoaMartList = createAsyncThunk(
    'getMoaMartList',
    async (data,{rejectWithValue}) => {
        try {
          const params = {
            limit: data.limit,
            page: data.page,
            appType: data.appType,
            keywordType: data.keyType,
            keywordValue: data.keyValue,
            status: data.status,
            isSyncOrder: data.isSyncOrder === 1 ? true: false,
            useStock: data.useStock === 1 ? true: false
          }
          const response = await Axios.post(`${MAIN_URL}/get_moa_mart_list`,params)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
  
  export const getDetailMart = createAsyncThunk(
    'getDetailMart',
    async (data,{rejectWithValue}) => {
        try {
          const response = await Axios.get(`${MAIN_URL}/get_detail_mart?mart_seq=${data}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
