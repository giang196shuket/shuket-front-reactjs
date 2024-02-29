import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/mart";

export const uploadMartLogo = createAsyncThunk(
  "uploadMartLogo",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("field_name", "image");
      formData.append("image", data);

      const response = await Axios.post(
        `${MAIN_URL}/upload_mart_logo`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const updateMart = createAsyncThunk(
  "updateMart",
  async (data, { rejectWithValue }) => {
    let dataUpdate = {
      ...data,
      city: typeof data.city === "object" ? data.city.code : data.city,
      district: typeof data.district === "object" ? data.district.code : data.district,
      partner: typeof data.partner === "object" ? data.partner.code : data.partner,
      pos: typeof data.pos === "object" ? data.pos.code : data.pos,
      sale_team: typeof data.sale_team === "object" ? data.sale_team.code : data.sale_team,
    };
    console.log("updateMart", dataUpdate);

    try {
      const response = await Axios.post(`${MAIN_URL}/update_mart`, dataUpdate);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getMoaMartList = createAsyncThunk(
  "getMoaMartList",
  async (data, { rejectWithValue }) => {
    try {
      const params = {
        ...data,
        isSyncOrder: data.isSyncOrder === 1 ? true : false,
        useStock: data.useStock === 1 ? true : false,
      };
      const response = await Axios.post(
        `${MAIN_URL}/get_moa_mart_list`,
        params
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getDetailMart = createAsyncThunk(
  "getDetailMart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${MAIN_URL}/get_detail_mart?mart_seq=${data}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getListGroupMart = createAsyncThunk(
  'getListGroupMart',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await Axios.get(`${MAIN_URL}/get_list_group_mart`)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);


export const addMart = createAsyncThunk(
  'addMart',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await Axios.post(`${MAIN_URL}/add_mart`,data)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);
