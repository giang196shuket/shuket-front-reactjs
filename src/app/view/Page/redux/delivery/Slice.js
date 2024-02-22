import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAddressList, searchAddressKakao } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  listAreaSearch:[],
  listArea:[],
  isAdd: '',
  wordSearchKakao: ""
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState: initialState,
  reducers: {
    setWordKakao: (state, action) => {
      state.wordSearchKakao = action.payload;
    },
    setAdd: (state, action) => {
      state.isAdd = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAddressKakao.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listAreaSearch = action.payload.data.data_list_full
      })
      .addCase(getAddressList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listArea = action.payload.data.list
      })

      .addMatcher(
        isAnyOf( searchAddressKakao.pending, getAddressList.pending) ,
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf( searchAddressKakao.rejected, getAddressList.rejected) ,
        (state, action) => {
          state.isLoading = true;
        }
      )
  },
});
export const { setWordKakao, setAdd } = deliverySlice.actions;


export default deliverySlice.reducer;
