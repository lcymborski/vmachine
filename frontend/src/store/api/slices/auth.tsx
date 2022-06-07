import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { UserInterface } from '~types/state'
import { baseApi } from '../base'
import { machineApi } from '../machine'

type AuthState = {
  isAuthenticated: boolean
  wasFetched: boolean
  user?: UserInterface
}

interface StateType {
  auth: AuthState
}

const slice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        baseApi.endpoints.login.matchFulfilled,
        baseApi.endpoints.getMe.matchFulfilled,
        machineApi.endpoints.deposit.matchFulfilled
      ),
      (state, { payload }) => {
        state.isAuthenticated = true
        state.wasFetched = true
        state.user = payload
      }
    )
    builder.addMatcher(baseApi.endpoints.logout.matchFulfilled, (state) => {
      state.isAuthenticated = false
      state.wasFetched = true
      state.user = undefined
    })
  },
})

export default slice.reducer

export const selectIsAuthenticated = (state: StateType) => state.auth.isAuthenticated
export const selectWasAuthFetched = (state: StateType) => state.auth.wasFetched
export const selectUser = (state: StateType) => state.auth.user
