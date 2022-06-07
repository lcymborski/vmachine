import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProductInterface, UserInterface } from '~types/state'
import { LoginInterface, SignupInterface, UserUpdateInterface } from '~types/request'
import { getApiRoot } from './utils'

const apiRoot = getApiRoot()

const baseQuery = fetchBaseQuery({
  baseUrl: apiRoot,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json')
    headers.set('Content-Type', 'application/json')
    headers.set('Cache-Control', 'no-cache')
    return headers
  },
  credentials: 'include',
})

export const baseApi = createApi({
  reducerPath: 'vmApi',
  baseQuery,
  tagTypes: ['Products', 'User'],
  endpoints: (builder) => ({
    signUp: builder.mutation<UserInterface, SignupInterface>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),
    getMe: builder.query<UserInterface, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    login: builder.mutation<UserInterface, LoginInterface>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<UserInterface, UserUpdateInterface>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteUser: builder.mutation<ProductInterface, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useSignUpMutation,
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = baseApi
