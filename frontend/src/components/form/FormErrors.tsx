import { useFormikContext } from 'formik'

const FormErrors = () => {
  const { status } = useFormikContext()
  if (!status) {
    return null
  }
  return (
    <div className="tw-text-sm tw-text-error-500 tw-pl-1 tw-mt-2">{status.error}</div>
  )
}
export default FormErrors
