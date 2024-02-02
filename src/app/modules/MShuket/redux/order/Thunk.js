
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/order";


export const getOrderList = createAsyncThunk(
    'getOrderList',
    async (data,{rejectWithValue}) => {
        try {
          console.log('getOrderList',data)
          
          const response = await axios.get(`${MAIN_URL}/get_order_list?page=${data.page}&limit=${data.limit}&sort_by_area=false`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  

