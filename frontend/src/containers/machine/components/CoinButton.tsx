import { useCallback } from 'react'
import cx from 'classnames'

interface CoinButtonInterface {
  denomination: number
  onClick: ({ value }: { value: number }) => void
  className?: string
}

const buttonClassName = cx(
  'tw-w-16 tw-h-16 tw-rounded-full tw-shadow',
  'tw-border tw-border-yellow-200',
  'tw-text-neutral-500',
  'hover:tw-text-neutral-600 hover:tw-scale-110',
  'tw-inline-block focus:tw-outline-none',
  'tw-transition tw-duration-150 tw-ease-in-out'
)

const CoinButton = ({ denomination, onClick, className }: CoinButtonInterface) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick({ value: denomination })
    }
  }, [denomination, onClick])
  return (
    <button type="button" className={cx(buttonClassName, className)} onClick={handleClick}>
      {denomination}c
    </button>
  )
}

export default CoinButton
