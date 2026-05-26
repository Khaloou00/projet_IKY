import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    selected: 'bijoux',
  },
  reducers: {
    setCategory: (state, { payload }) => {
      state.selected = payload
    },
  },
})

export const { setCategory } = categorySlice.actions
export default categorySlice.reducer
