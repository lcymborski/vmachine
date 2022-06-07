import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

// defined in webpack.common.js with DefinePlugin
declare var __APIROOT__: string
export const getApiRoot = () => `${__APIROOT__}`

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

export const getErrorMessage = (error: any) => {
  if (isFetchBaseQueryError(error)) {
    return 'error' in error ? error.error : JSON.stringify(error.data)
  } else if (isErrorWithMessage(error)) {
    return error.message
  }
  return undefined
}

export const getErrorMessageFromResult = (result: any) => {
  if ('error' in result) {
    const { error } = result
    if (isFetchBaseQueryError(error)) {
      return 'error' in error ? error.error : JSON.stringify(error.data)
    } else if (isErrorWithMessage(error)) {
      return error.message
    }
  }
  return undefined
}
