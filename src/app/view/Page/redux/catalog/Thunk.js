
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/catalogs";


export const getListCatalog = createAsyncThunk(
    'getListCatalog',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_list?page=${data.page}&limit=${data.limit}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  

