import { useCallback, useState } from 'react'
import * as yup from 'yup'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'
import Content from '~components/Content'
import Heading from '~components/Heading'
import {
  getErrorMessageFromResult,
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from '~store/api'
import { useNavigate, useParams } from 'react-router-dom'
import { Field, Form } from '~components/form'
import { NewProduct } from '~types/request'
import { FormikHelpers, FormikValues } from 'formik'
import Button from '~components/Button'
import { ErrorResultInterface, updateFormErrors } from '~lib/errors'

const schema = yup.object().shape({
  productName: yup.string().required('Please enter product name.'),
  cost: yup.number().integer().positive().required('Please enter product price.'),
  amountAvailable: yup.number().integer().positive().required('Please enter product quantity.'),
})

const newInitial = {
  productName: '',
  amountAvailable: '',
  cost: '',
}

const ProductForm = () => {
  const { productId = 0 } = useParams()
  const navigate = useNavigate()
  const { data: product } = useGetProductQuery(Number(productId) || skipToken)
  const [createProduct] = useCreateProductMutation()
  const [updateProduct] = useUpdateProductMutation()

  const initial = product
    ? {
        productName: product.productName,
        amountAvailable: product.amountAvailable,
        cost: product.cost,
      }
    : newInitial

  const handleSubmit = useCallback(
    (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      const id = Number(productId)
      const prodValues = values as NewProduct
      ;(id ? updateProduct({ id, ...prodValues }) : createProduct(prodValues)).then((result) => {
        formikHelpers.setSubmitting(false)
        if (!getErrorMessageFromResult(result)) {
          toast.info('Product saved.')
          navigate('/')
        } else {
          updateFormErrors(result as ErrorResultInterface, formikHelpers)
        }
      })
    },
    [productId, createProduct, updateProduct]
  )

  return (
    <div>
      <Heading title={productId ? 'Edit product' : 'Add product'}>
        <Button text="Back to products" icon="back" linkTo="/" inverted />
      </Heading>
      <Content hasMinHeight={false}>
        <Form
          initialValues={initial}
          validationSchema={schema}
          onSubmit={handleSubmit}
          submitButtonLabel="Save product"
          className="sm:tw-w-1/2 tw-w-full"
        >
          <Field name="productName" label="Product name" className="tw-w-full" type="text" />
          <Field name="cost" label="Price" type="number" />
          <Field name="amountAvailable" label="Quantity available" type="number" />
        </Form>
      </Content>
    </div>
  )
}

export default ProductForm
