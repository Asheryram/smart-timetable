import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
  data: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: {
      reducer(state, action) {
        state.data = action.payload;
       
      },
    },
  },
});

export const { setData} =authSlice.actions;

export const getData= (state) => state?.auth?.data;


export default authSlice.reducer;
