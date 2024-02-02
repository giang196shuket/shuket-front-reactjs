
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/appbuilder";


export const getScreenBuilder = createAsyncThunk(
    'getScreenBuilder',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_screen_builder`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );



  export const getAppScreenDetail = createAsyncThunk(
    'getAppScreenDetail',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_app_screen_detail?sc_code=` +data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  
  

