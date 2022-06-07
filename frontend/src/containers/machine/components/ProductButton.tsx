import { useCallback } from 'react'
import cx from 'classnames'

interface ProductButtonInterface {
  productId: number
  productName: string
  price: number
  onClick: (id: number) => void
  selected?: boolean
  className?: string
}

const buttonClassName = cx(
  'tw-w-24 tw-h-24 tw-rounded-md',
  'tw-shadow',
  'tw-text-neutral-500',
  'hover:tw-shadow-lg hover:tw-scale-105',
  'tw-inline-block focus:tw-outline-none',
  'tw-transition tw-duration-150 tw-ease-in-out'
)

const ProductButton = ({
  productId,
  productName,
  price,
  onClick,
  selected = false,
  className,
}: ProductButtonInterface) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(productId)
    }
  }, [productId, onClick])
  return (
    <button
      type="button"
      className={cx(buttonClassName, className, { 'tw-bg-neutral-200': selected })}
      onClick={handleClick}
    >
      {productName}
      <br />
      <span className="tw-text-sm tw-text-neutral-400">{price} c</span>
    </button>
  )
}

export default ProductButton
