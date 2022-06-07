import { useMemo, memo } from 'react'
import cx from 'classnames'
import { ErrorMessage, Field as FormikField, useField } from 'formik'
import RadioGroup from './RadioGroup'
import FieldError from './FieldError'

interface InnerFieldInterface {
  name: string
  type: 'text' | 'number' | 'password' | 'radiogroup'
  label: string
  options?: { label: string; value: string | number }[]
  placeholder?: string
}

const InnerField = ({ name, label, type, placeholder, options }: InnerFieldInterface) => {
  const [field, { error, touched }] = useField(name)
  const fieldClassName = useMemo(
    () => `tw-block tw-text-neutral-700 input${error && touched ? '-invalid' : ''}`,
    [error, touched]
  )
  switch (type) {
    case 'text':
    case 'number':
    case 'password':
      return (
        <FormikField name={name} type={type} placeholder={placeholder} className={fieldClassName} />
      )
    case 'radiogroup':
      return (
        <RadioGroup
          name={name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          options={options}
          label={label}
        />
      )
    default:
      return null
  }
}

const InnerFieldMemoized = memo(InnerField)

interface FieldInterface extends InnerFieldInterface {
  id?: string
  className?: string
  labelClassName?: string
}

const Field = ({
  id,
  name,
  label,
  type,
  placeholder,
  options,
  className,
  labelClassName,
}: FieldInterface) => {
  const htmlFor = id || name
  return (
    <div className={cx(className)}>
      {label && type !== 'radiogroup' && (
        <label
          className={cx(
            'tw-block',
            {
              'label tw-mt-4': !labelClassName,
            },
            labelClassName
          )}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
      <div className="tw-text-sm">
        <InnerFieldMemoized
          name={name}
          label={label}
          type={type}
          placeholder={placeholder}
          options={options}
        />
      </div>
      <ErrorMessage name={name} component={FieldError} />
    </div>
  )
}

export default Field
