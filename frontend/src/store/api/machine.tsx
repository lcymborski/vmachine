import { BuyInterface } from '~types/request'
import { PurchaseInterface, UserInterface } from '~types/state'
import { productApi } from './product'

export const machineApi = productApi.injectEndpoints({
  endpoints: (builder) => ({
    deposit: builder.mutation<UserInterface, { value: number }>({
      query: (data) => ({
        url: '/deposit',
        method: 'POST',
        body: data,
      }),
    }),
    buy: builder.mutation<PurchaseInterface, BuyInterface>({
      query: (data) => ({
        url: 'buy',
        method: 'POST',
        body: data,
      }),
    }),
    reset: builder.mutation<UserInterface, void>({
      query: (id) => ({
        url: 'reset',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useDepositMutation, useBuyMutation, useResetMutation } = machineApi
