
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/notice";


export const getNoticeMoaList = createAsyncThunk(
    'get_notice_list',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_notice_list?page=${data.page}&limit=${data.limit}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  export const getNoticeAppList = createAsyncThunk(
    'get_list_noti_msg',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.post(`${MAIN_URL}/get_list_noti_msg`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  

