import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
  credentials: 'include', // sends HTTP-only refresh token cookie automatically
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.accessToken
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Products', 'Orders', 'Users', 'Notifications'],
  endpoints: () => ({}),
})
