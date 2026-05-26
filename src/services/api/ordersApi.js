import { baseApi } from './baseApi'

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (params = {}) => ({ url: '/api/v1/orders', params }),
      transformResponse: (res) => res.data ?? res,
      providesTags: ['Orders'],
    }),
    getMyOrders: builder.query({
      query: () => '/api/v1/orders/my',
      transformResponse: (res) => res.data ?? res,
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation({
      query: (data) => ({ url: '/api/v1/orders', method: 'POST', body: data }),
      invalidatesTags: ['Orders'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/v1/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} = ordersApi
