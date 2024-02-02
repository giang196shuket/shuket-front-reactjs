
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/fcm";


export const getFcmList = createAsyncThunk(
    'getFcmList',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.post(`${MAIN_URL}/fcm_list`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  

