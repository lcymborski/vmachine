import { FormikHelpers, FormikValues } from 'formik'

export interface ErrorResultInterface {
  error: {
    status: number
    data: {
      fieldErrors: { field: string; message: string }[]
      nonFieldErrors: string[]
    }
  }
}

export const updateFormErrors = (
  result: ErrorResultInterface,
  formikHelpers: FormikHelpers<FormikValues>
) => {
  const { status, data } = result.error
  if (status === 400) {
    if (data?.fieldErrors?.length) {
      formikHelpers.setErrors(
        data.fieldErrors.reduce((prev, f) => ({ ...prev, [f.field]: f.message }), {})
      )
    }
    if (data?.nonFieldErrors?.length) {
      formikHelpers.setStatus({ error: data.nonFieldErrors.join(' ') })
    }
  }
}
