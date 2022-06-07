import { combineReducers } from '@reduxjs/toolkit'

import { api } from '~store/api'

import authReducer from '~api/slices/auth'
import depositReducer from '~api/slices/deposit'

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  deposit: depositReducer,
})

export type RootState = ReturnType<typeof appReducer>
export default appReducer
