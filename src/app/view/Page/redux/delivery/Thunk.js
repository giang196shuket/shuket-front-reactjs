
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/delivery";


export const searchAddressKakao = createAsyncThunk(
    'searchAddressKakao',
    async (data,{rejectWithValue}) => {
      console.log('data',data)
        try {
          
          const response = await axios.post(`${MAIN_URL}/check_address`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const getAddressList = createAsyncThunk(
    'getAddressList',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_mart_delivery_address_list?page=${data.page}&per_page=${data.limit}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  
  export const addMutiAddress = createAsyncThunk(
    'addMutiAddress',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.post(`${MAIN_URL}/add_muti_address`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  
