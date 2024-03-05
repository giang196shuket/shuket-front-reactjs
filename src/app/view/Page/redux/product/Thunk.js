import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MAIN_URL = process.env.REACT_APP_BACKEND_URL + "/product";
//price
export const getProductPriceList = createAsyncThunk(
  "getProductPriceList",
  async (data, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        `${MAIN_URL}/search_product_price_list`,data       
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const setPriceForProduct = createAsyncThunk(
  "setPriceForProduct",
  async (data, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        `${MAIN_URL}/set_price_for_product`,data       
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//inventory
export const getProductInventoryList = createAsyncThunk(
  "getProductInventoryList",
  async (data, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        `${MAIN_URL}/search_product_inventory_list`,data       
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//unregister
export const getProductUnregisterList = createAsyncThunk(
  "getProductUnregisterList",
  async (data, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        `${MAIN_URL}/search_product_unregistered_list`,data       
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const registerProduct = createAsyncThunk(
  "registerProduct",
  async (data, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        `${MAIN_URL}/register_product`,data       
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const registerProductMulti = createAsyncThunk(
  "registerProductMulti",
  async (data, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        `${MAIN_URL}/register_product_multi`,data       
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//register
export const getProductRegisterList = createAsyncThunk(
  "getProductRegisterList",
  async (data, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        `${MAIN_URL}/search_product_registered_list`,data       
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateStockItem = createAsyncThunk(
  "updateStockItem",
  async (data, { rejectWithValue }) => {
    try {
      await axios.post(
        `${MAIN_URL}/update_stock_item`,data        
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const setMaxMinProduct = createAsyncThunk(
  "setMaxMinProduct",
  async (data, { rejectWithValue }) => {
    try {
      await axios.post(
        `${MAIN_URL}/set_max_min_product`,data        
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const productStockStatus = createAsyncThunk(
  "productStockStatus",
  async (data, { rejectWithValue }) => {
    try {
      const param = {...data, prd_stock_status: data.is_pro_stock === 0 ? 1 : 0 }  
      await axios.post(
        `${MAIN_URL}/product_stock_status`,param
      );
      return param;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const ViewDetail = createAsyncThunk(
  "ViewDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response =  await axios.get(
        `${MAIN_URL}/view_detail?code=${data}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);



export const searchProductImages = createAsyncThunk(
  "searchProductImages",
  async (data, { rejectWithValue }) => {
    try {
      const response =  await axios.post(
        `${MAIN_URL}/search_product_images`,data,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


//common
export const updateStatus = createAsyncThunk(
  'updateStatus',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await axios.post(`${MAIN_URL}/update_status`,data)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);


export const getProductCategory = createAsyncThunk(
  'getProductCategory',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await axios.post(`${MAIN_URL}/get_product_categories`,data)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

// update tag and image 
export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await axios.post(`${MAIN_URL}/update_product`,data)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

export const updateMultiStatusPrd = createAsyncThunk(
  'updateMultiStatusPrd',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await axios.post(`${MAIN_URL}/update_multi_prd`,data)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

export const settingAllMaxMinProduct = createAsyncThunk(
  'settingAllMaxMinProduct',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await axios.post(`${MAIN_URL}/setting_all_max_min_product`,data)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);


export const settingAllStockProduct = createAsyncThunk(
  'settingAllStockProduct',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await axios.post(`${MAIN_URL}/setting_all_stock_product`,data)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

