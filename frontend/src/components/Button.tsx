import { memo } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from './Icon'

const hSizes = { mini: 0, small: 2, normal: 4, big: 4, large: 8 }
const vSizes = { mini: 0, small: 1, normal: 2, big: 2, large: 8 }
const iconSizes = { mini: 6, small: 5, normal: 6, big: 8, large: 8 }
const alignments = { left: 'start', center: 'center', right: 'end' }

// btn-pill, btn-pill-outlined, btn-pill-inverted

interface ButtonInterface {
  text?: string
  title?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  iconSize?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64
  buttonStyle?: 'primary' | 'secondary' | 'neutral' | 'pill'
  orientation?: 'horizontal' | 'vertical'
  size?: keyof typeof hSizes
  type?: 'button' | 'reset' | 'submit'
  alignment?: keyof typeof alignments
  fullWidth?: boolean
  outlined?: boolean
  inverted?: boolean
  light?: boolean
  uppercase?: boolean
  strong?: boolean
  hasShadow?: boolean
  disabled?: boolean
  className?: string
  linkTo?: string
  onClick?: () => void
  children?: React.ReactNode
}

const Button = ({
  text = '',
  title = '',
  icon = '',
  buttonStyle = 'primary',
  orientation = 'horizontal',
  size = 'normal',
  type = 'button',
  iconPosition = 'left',
  iconSize = 4,
  alignment = 'center',
  fullWidth = false,
  outlined = false,
  inverted = false,
  light = false,
  hasShadow = false,
  disabled = false,
  linkTo = '',
  uppercase = false,
  strong = false,
  className,
  onClick,
  children,
}: ButtonInterface) => {
  const titleClasses = cx({
    [`tw-pl-${size === 'mini' ? 2 : 3}`]:
      icon && iconPosition === 'left' && orientation === 'horizontal',
    [`tw-pr-${size === 'mini' ? 2 : 3}`]:
      icon && iconPosition === 'right' && orientation === 'horizontal',
    'tw-pt-1': orientation !== 'horizontal',
  })

  let buttonCssClass = `btn-${buttonStyle}`
  if (outlined) {
    buttonCssClass = `${buttonCssClass}-outlined`
  } else if (light) {
    buttonCssClass = `${buttonCssClass}-light`
  } else if (inverted) {
    buttonCssClass = `${buttonCssClass}-inverted`
  }
  const finalClass = cx(
    {
      btn: true,
      'tw-rounded-md': true,
      'tw-cursor-pointer ': !disabled,
      [buttonCssClass]: true,
      [`tw-px-${hSizes[size]}`]: true,
      [`tw-py-${vSizes[size]}`]: true,
      'tw-w-full': fullWidth,
      'tw-flex-grow': fullWidth,
      'tw-uppercase': uppercase,
      'tw-font-semibold': strong,
      'tw-shadow': hasShadow,
    },
    className
  )
  const buttonProps: any = {
    className: finalClass,
    onClick,
    ...(disabled && !linkTo ? { disabled: 'disabled' } : {}),
  }
  if (title) {
    buttonProps.title = title
  }
  const iconProps: any = { size: iconSizes[size], className: 'tw-text-primary-500' }
  if (buttonStyle === 'neutral' && (outlined || inverted)) {
    iconProps.className = 'tw-text-primary-500'
  }
  if (buttonStyle === 'neutral' && light) {
    // iconProps.className = 'tw-text-neutral-400 hover:tw-text-primary-500';
    iconProps.className = cx(
      {
        'tw-text-primary-300': !!text,
        'tw-text-neutral-400': !text,
      },
      'hover:tw-text-primary-500'
    )
  }
  if (disabled) {
    iconProps.className = cx({
      'tw-text-neutral-400': !linkTo,
      'tw-text-neutral-300': !!linkTo,
    })
  }
  if (orientation === 'vertical' && size === 'large') {
    iconProps.size = 10
  }
  const wrapperClass = cx('tw-flex tw-items-center', {
    [`tw-justify-${alignments[alignment]}`]: true,
    'tw-flex-col': orientation !== 'horizontal',
    [`tw-text-${alignment}`]: true,
  })
  if (iconSize) {
    iconProps.size = iconSize
  }
  if (linkTo) {
    buttonProps.to = linkTo
    if (disabled) {
      return (
        <span className={buttonProps.className}>
          <span className={wrapperClass}>
            {icon && iconPosition === 'left' && <Icon name={icon} {...iconProps} />}
            {text && <span className={titleClasses}>{text}</span>}
            {children}
            {icon && iconPosition === 'right' && <Icon name={icon} {...iconProps} />}
          </span>
        </span>
      )
    }
    return (
      <Link {...buttonProps}>
        <span className={wrapperClass}>
          {icon && iconPosition === 'left' && <Icon name={icon} {...iconProps} />}
          {text && <span className={titleClasses}>{text}</span>}
          {children}
          {icon && iconPosition === 'right' && <Icon name={icon} {...iconProps} />}
        </span>
      </Link>
    )
  }
  buttonProps.type = type
  return (
    <button {...buttonProps}>
      <span className={wrapperClass}>
        {icon && iconPosition === 'left' && <Icon name={icon} {...iconProps} />}
        {text && <span className={titleClasses}>{text}</span>}
        {children}
        {icon && iconPosition === 'right' && <Icon name={icon} {...iconProps} />}
      </span>
    </button>
  )
}

export default memo(Button)
