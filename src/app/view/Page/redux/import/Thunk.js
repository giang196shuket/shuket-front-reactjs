
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/import";


export const getListMart = createAsyncThunk(
    'getListMart',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_listmart`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  
export const uploadFileImport = createAsyncThunk(
  'uploadFileImport',
  async (data,{rejectWithValue}) => {
      try {
        console.log('data',data)
        const formData = new FormData();
        formData.append('mart_code', data.mart_code);
        formData.append('action', 'import');
        formData.append('file', data.file);

      
        const response = await axios.post(`${MAIN_URL}/upload_file`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
                })
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);



