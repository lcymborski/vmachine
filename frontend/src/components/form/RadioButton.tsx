import { memo } from 'react'
import cx from 'classnames'

interface RadioButtonInterface {
  name: string
  label: string
  value: string | number
  checked: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  className?: string
  id?: string
}

const RadioButton = ({
  name,
  value,
  checked,
  onChange,
  onBlur,
  label,
  className,
  id,
}: RadioButtonInterface) => (
  <div className={cx('tw-block radio-wrapper', className)}>
    <input
      name={name}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      id={`${name}-${id || '0'}`}
      className="radio"
    />
    <label htmlFor={`${name}-${id || '0'}`} className="">
      {label}
    </label>
  </div>
)

export default memo(RadioButton)
