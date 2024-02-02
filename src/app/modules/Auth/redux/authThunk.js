import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
let MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/auth";

export const getListAccountSwitch = createAsyncThunk(
  'getListAccountSwitch',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await Axios.get(process.env.REACT_APP_BACKEND_URL+`/main/get_list_account_switch`)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

export const userSwitchAccount = createAsyncThunk(
  'userSwitchAccount',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await Axios.get(`${MAIN_URL}/user_switch_account/${data}`)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

export const resetAccount = createAsyncThunk(
  'resetAccount',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await Axios.get(`${MAIN_URL}/reset_account`)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);


export const actionLoginAccount = createAsyncThunk(
  'account/loginAccount',
  async (loginData) => {

    const res = await fetch(MAIN_URL+'/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
    },
    });
    const data = await res.json();
    return data;
 
  }
);
export const actionLogoutAccount = createAsyncThunk(
  'account/logoutAccount',
  () => {
    let res='okay'
    return res;
  }
);