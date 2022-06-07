import { FormikHelpers, FormikValues } from 'formik'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import Content from '~components/Content'
import { Field, Form } from '~components/form'
import Heading from '~components/Heading'
import { ErrorResultInterface, updateFormErrors } from '~lib/errors'
import {
  getErrorMessageFromResult,
  useBuyMutation,
  useDepositMutation,
  useGetProductsQuery,
} from '~store/api'
import CoinAcceptor from './components/CoinAcceptor'
import DepositInfo from './components/DepositInfo'
import ProductSelect from './components/ProductSelect'

const initial = { quantity: 1 }

const schema = yup.object().shape({
  quantity: yup.number().integer().positive().required('Please enter product quantity.'),
})

const VendingMachine = () => {
  const navigate = useNavigate()
  const { data: products } = useGetProductsQuery()
  const [buy] = useBuyMutation()
  const [updateDeposit] = useDepositMutation()
  const [productId, setProductId] = useState(0)

  const handleProductSelect = (value: number) => setProductId(value)

  const handleSubmit = useCallback(
    (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      const { quantity } = values as { quantity: number }
      let firstProductId = 0
      if (products) {
        firstProductId = products[0].id
      }
      const args = { productId: productId || firstProductId, quantity }
      buy(args).then((result) => {
        formikHelpers.setSubmitting(false)
        if (!getErrorMessageFromResult(result)) {
          let message = 'Your purchase was successful.'
          if ('data' in result) {
            if (result.data.change.length) {
              message = `${message} Your change: ${JSON.stringify(result.data.change)}`
            }
          }
          toast.info(message, { closeOnClick: true })
          navigate('/')
        } else {
          updateFormErrors(result as ErrorResultInterface, formikHelpers)
        }
      })
    },
    [productId, products, navigate]
  )

  if (!products) {
    return null
  }

  return (
    <div>
      <Heading title="Buy some products" />
      <Content>
        <div className="tw-mt-4 tw-flex tw-flex-row">
          <div className="tw-mr-12">
            <ProductSelect selectedId={productId} onClick={handleProductSelect} />
            <Form
              initialValues={initial}
              validationSchema={schema}
              onSubmit={handleSubmit}
              submitButtonLabel="Buy"
              className="tw-inline-block"
            >
              <Field name="quantity" label="Quantity" type="number" />
            </Form>
          </div>
          <div className="tw-border tw-border-neutral-200 tw-rounded-md tw-p-8">
            <div className="tw-text-sm tw-text-neutral-600 tw-pb-2">Insert coins:</div>
            <CoinAcceptor onClick={updateDeposit} />
            <DepositInfo />
          </div>
        </div>
      </Content>
    </div>
  )
}

export default VendingMachine
