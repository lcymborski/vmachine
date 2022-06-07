interface FieldErrorInterface {
  children?: React.ReactNode
}

const FieldError = ({ children }: FieldErrorInterface) => (
  <div className="tw-text-sm tw-text-error-500 tw-pl-1">{children}</div>
)

export default FieldError
