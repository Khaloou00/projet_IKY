import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    user: null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.accessToken = payload.accessToken
      state.user = payload.user
    },
    updateUser: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    },
    logout: (state) => {
      state.accessToken = null
      state.user = null
    },
  },
})

export const { setCredentials, updateUser, logout } = authSlice.actions
export default authSlice.reducer
