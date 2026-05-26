import { baseApi } from './baseApi'

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params = {}) => ({ url: '/api/v1/products', params }),
      transformResponse: (res) => res.data ?? res,
      providesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: (id) => `/api/v1/products/${id}`,
      transformResponse: (res) => res.data ?? res,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
    addProduct: builder.mutation({
      query: (data) => ({ url: '/api/v1/products', method: 'POST', body: data }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/api/v1/products/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/api/v1/products/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: '/api/v1/upload',
        method: 'POST',
        body: formData,
        // Don't set Content-Type — browser sets it with boundary for FormData
        formData: true,
      }),
    }),
    deleteProductImage: builder.mutation({
      query: ({ url }) => ({ url: '/api/v1/upload', method: 'DELETE', body: { url } }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useDeleteProductImageMutation,
} = productsApi
