import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { baseApi } from '../base'
import { machineApi } from '../machine'

type DepositState = {
  value: number
}

interface StateType {
  deposit: DepositState
}

const slice = createSlice({
  name: 'depo',
  initialState: { value: 0 } as DepositState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        baseApi.endpoints.login.matchFulfilled,
        baseApi.endpoints.getMe.matchFulfilled,
        machineApi.endpoints.deposit.matchFulfilled,
        machineApi.endpoints.reset.matchFulfilled
      ),
      (state, { payload }) => {
        state.value = payload.deposit
      }
    )
    builder.addMatcher(isAnyOf(machineApi.endpoints.buy.matchFulfilled), (state, { payload }) => {
      state.value = 0
    })
  },
})

export default slice.reducer

export const selectDeposit = (state: StateType) => state.deposit.value
