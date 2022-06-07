import { useCallback, useState } from 'react'
import cx from 'classnames'
import { useSelector } from 'react-redux'
import Button from '~components/Button'
import Confirm from '~components/Confirm'
import Content from '~components/Content'
import Heading from '~components/Heading'
import { selectUser, useDeleteProductMutation, useGetProductsQuery } from '~store/api'

const ProductList = () => {
  const user = useSelector(selectUser)
  const { data: products, isFetching } = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [itemId, setItemId] = useState(0)

  const showConfirm = (id: number) => {
    setItemId(id)
    setIsConfirmOpen(true)
  }

  const hideConfirm = () => {
    setIsConfirmOpen(false)
  }

  const handleDelete = useCallback(() => {
    deleteProduct(itemId)
    setItemId(0)
  }, [deleteProduct, itemId, setItemId])

  if (!products) {
    return null
  }

  return (
    <div>
      <Heading title="Products">
        <Button
          text="Add"
          icon="plus"
          strong
          buttonStyle="neutral"
          outlined
          inverted
          linkTo="products/new"
          hasShadow
          className="tw-ml-4 tw-text-sm"
        />
      </Heading>
      <Content hasBorder={false} hasMinHeight={false} hasCard={false}>
        <div
          className={cx(
            'tw-align-middle tw-inline-block tw-bg-white',
            'tw-overflow-hidden tw-min-w-full tw-shadow sm:tw-rounded-lg'
          )}
        >
          <table className="tw-border-collapse tw-w-full">
            <thead>
              <tr>
                <th className="th">Id</th>
                <th className="th">Product Name</th>
                <th className="th">Price</th>
                <th className="th">Quantity available</th>
                <th className="th">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="td">{product.id}</td>
                  <td className="td">{product.productName}</td>
                  <td className="td">{product.cost}</td>
                  <td className="td">{product.amountAvailable}</td>
                  <td className="td">
                    {product.sellerId === user?.id && (
                      <>
                        <Button
                          onClick={() => showConfirm(product.id)}
                          icon="close"
                          size="small"
                          title="Add product"
                          inverted
                        />
                        <Button
                          linkTo={`/products/${product.id}`}
                          icon="edit"
                          size="small"
                          title="Edit product"
                          inverted
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Confirm
          isOpen={isConfirmOpen}
          title="Product removal"
          onClose={hideConfirm}
          onOk={handleDelete}
          okLabel="Delete"
        >
          <div>
            <p>Are you sure you want to delete this product?</p>
          </div>
        </Confirm>
      </Content>
    </div>
  )
}

export default ProductList
