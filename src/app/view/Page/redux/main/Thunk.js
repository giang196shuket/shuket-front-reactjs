
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/main";
export const POS_URL = process.env.REACT_APP_BACKEND_URL + "/pos";
export const PARTNER_URL = process.env.REACT_APP_BACKEND_URL + "/partner";
export const SALECOLLECTION_URL = process.env.REACT_APP_BACKEND_URL + "/sales_collection";


 
export function getMenuLeftBar() {
  return axios.get(`${MAIN_URL}/get_left_menu_bar`);
}

export const getTypeMart = createAsyncThunk(
    'getTypeMart',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_type_mart`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const getCityOptions = createAsyncThunk(
    'getCityOptions',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_city_options`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const getDistrictOptions = createAsyncThunk(
    'getDistrictOptions',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/get_district_options?ct_code=${data}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  export const getMartCommonWhere = createAsyncThunk(
    'getMartCommonWhere',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${SALECOLLECTION_URL}/get_mart_common_where`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );



  export const getPosOptions = createAsyncThunk(
    'getPosOptions',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${POS_URL}/get_pos_options`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );



  export const getPartnerOptions = createAsyncThunk(
    'getPartnerOptions',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${PARTNER_URL}/get_partner_options`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );




  export const getPartnerSalesTeamOptions = createAsyncThunk(
    'getPartnerSalesTeamOptions',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${PARTNER_URL}/get_partner_sales_team_options?sp_code=${data}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

