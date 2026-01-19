import { createSlice } from "@reduxjs/toolkit";

const superbieSlice = createSlice({
  name: "superbieSlice",
  initialState: {
    products: [],
    category: "bijoux",
  },
  reducers: {
    setCategory: (state, action) => {
      console.log(action);
      state.category = action.payload;
    },
  },
});

export const { setCategory } = superbieSlice.actions;
export const superbieReducer = superbieSlice.reducer;
