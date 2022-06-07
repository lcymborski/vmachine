import { useState, useRef, useCallback, SyntheticEvent } from 'react'
import cx from 'classnames'
import { useOnClickOutside } from '~lib/hooks'
import Transition from '~components/Transition'

const defaultMenuClassName = cx(
  'tw-origin-top-right tw-absolute tw-right-0',
  'tw-mt-2 tw-w-48 tw-rounded-md tw-shadow-lg tw-z-10'
)

interface DropdownInterface {
  menuId: string
  menuLabel: string
  className?: string
  buttonText?: string
  buttonClassName: string
  buttonTitle?: string
  menuClassName?: string
  children?: React.ReactNode | ((f: () => void) => React.ReactNode)
}

const Dropdown = ({
  menuId,
  menuLabel,
  className,
  buttonText,
  buttonClassName,
  buttonTitle,
  menuClassName = defaultMenuClassName,
  children,
}: DropdownInterface) => {
  const wrapperRef = useRef(null)
  const nodeRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [setIsOpen])

  const handleClick = useCallback(
    (e: SyntheticEvent) => {
      setIsOpen((open) => !open)
      e.preventDefault()
    },
    [setIsOpen]
  )

  useOnClickOutside(wrapperRef, close)

  return (
    <div ref={wrapperRef} className={cx('tw-relative', className)}>
      <div>
        <button
          className={buttonClassName}
          onClick={handleClick}
          id={menuId}
          aria-label={menuLabel}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : 'false'}
          title={buttonTitle}
        >
          {buttonText ?? ''}
        </button>
      </div>
      <Transition
        nodeRef={nodeRef}
        show={isOpen}
        enter="tw-transition tw-ease-out tw-duration-100 tw-transform"
        enterFrom="tw-opacity-0 tw-scale-95"
        enterTo="tw-opacity-100 tw-scale-100"
        leave="tw-transition tw-ease-in tw-duration-75 tw-transform"
        leaveFrom="tw-opacity-100 tw-scale-100"
        leaveTo="tw-opacity-0 tw-scale-95"
      >
        <div ref={nodeRef} className={menuClassName}>
          <div
            className="tw-py-1 tw-rounded-md tw-bg-white tw-shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby={menuId}
          >
            {typeof children === 'function' && children(close)}
            {typeof children !== 'function' && children}
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default Dropdown
