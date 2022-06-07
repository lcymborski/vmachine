import { useGetProductsQuery } from '~store/api'
import ProductButton from './ProductButton'

interface ProductSelectInterface {
  selectedId?: number
  onClick: (value: number) => void
}

const ProductSelect = ({ selectedId = 0, onClick }: ProductSelectInterface) => {
  const { data: products } = useGetProductsQuery()

  if (!products) {
    return null
  }

  return (
    <div className="tw-flex tw-flex-wrap">
      {products.map((p, i) => (
        <ProductButton
          key={p.id}
          productId={p.id}
          productName={p.productName}
          price={p.cost}
          selected={p.id === selectedId || (i === 0 && selectedId === 0)}
          onClick={onClick}
          className="tw-mr-6"
        />
      ))}
    </div>
  )
}

export default ProductSelect
