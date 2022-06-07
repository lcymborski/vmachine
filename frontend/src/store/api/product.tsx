import { NewProduct, ProductUpdate } from '~types/request'
import { ProductInterface } from '~types/state'
import { baseApi } from './base'

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductInterface[], void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getProduct: builder.query<ProductInterface, number>({
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation<ProductInterface, NewProduct>({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<ProductInterface, ProductUpdate>({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<ProductInterface, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi
