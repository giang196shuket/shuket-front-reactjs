
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/users";

export const checkUserAdminId = createAsyncThunk(
  'checkUserAdminId',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await axios.post(`${MAIN_URL}/check_users_admin_id`,data)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

export const getUserAccountList = createAsyncThunk(
    'getUserAccountList',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.post(`${MAIN_URL}/search_list`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  export const getProgsRoleById = createAsyncThunk(
    'getProgsRoleById',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_progs_role_by_id?user_id=${data}`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const getLevelList = createAsyncThunk(
    'getLevelList',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/search_level_list`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  

