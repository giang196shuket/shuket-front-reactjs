
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/images";


export const getImageBannerCoupon = createAsyncThunk(
    'getImageBannerCoupon',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.post(`${MAIN_URL}/get_images`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const getCatesImages = createAsyncThunk(
    'getCatesImages',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await axios.get(`${MAIN_URL}/cate_images`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );



    
export const addImagesCouponBanner = createAsyncThunk(
  'addImagesCouponBanner',
  async (data,{rejectWithValue}) => {
      try {
        console.log('data',data)
        const formData = new FormData();
        formData.append('bnr_status', data.bnr_status);
        formData.append('bnr_status_logic', data.bnr_status_logic);
        formData.append('image_cate', data.image_cate);
        formData.append('image_type', data.image_type);
        formData.append('is_set_mart', data.is_set_mart);
        for (const file of data.muti_file) {
          formData.append('muti_file', file);
        }
        const response = await axios.post(`${MAIN_URL}/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
                })
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

  

