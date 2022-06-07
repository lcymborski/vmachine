import { memo } from 'react'
import RadioButton from './RadioButton'

interface RadioGroupInterface {
  name: string
  label: string
  value: string | number
  options?: { label: string; value: string | number }[]
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  className?: string
}

const RadioGroup = ({ name, value, onChange, onBlur, options, label }: RadioGroupInterface) => {
  if (!options) {
    return null
  }
  return (
    <div>
      <fieldset>
        {label && <legend className="label tw-block tw-mt-4">{label}</legend>}
        <div className="tw-text-base tw-flex tw-my-2">
          {options.map((o, i) => (
            <RadioButton
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={o.value}
              checked={String(value) === String(o.value)}
              id={`${i}`}
              label={o.label}
              key={`key-${name}-${i}`}
              className={i ? 'tw-ml-4 tw-text-sm' : 'tw-text-sm'}
            />
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export default memo(RadioGroup)
