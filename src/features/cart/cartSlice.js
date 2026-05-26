import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const existing = state.items.find((i) => i._id === payload._id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...payload, quantity: 1 })
      }
    },
    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter((i) => i._id !== payload)
    },
    updateQuantity: (state, { payload: { id, quantity } }) => {
      const item = state.items.find((i) => i._id === id)
      if (item) item.quantity = Math.max(1, quantity)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
