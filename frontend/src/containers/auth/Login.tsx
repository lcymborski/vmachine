// import { Redirect } from 'react-router-dom';
import { FormikHelpers, FormikValues } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Button from '~components/Button'
import { Form, Field } from '~components/form'
import Logo from '~components/Logo'
import { getErrorMessageFromResult, useLoginMutation } from '~store/api'
import { LoginInterface } from '~types/request'
import { ErrorResultInterface, updateFormErrors } from '~lib/errors'

const schema = yup.object().shape({
  username: yup.string().required('Please enter username.'),
  password: yup.string().required('Please enter password.'),
})

const initialValues = {
  username: '',
  password: '',
}

type LocationWithState = {
  state: {
    from: Location
  }
}

const Login = () => {
  let navigate = useNavigate()
  let location = useLocation() as LocationWithState
  const [login] = useLoginMutation()

  let from = location.state?.from?.pathname || '/'

  const handleSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    login(values as LoginInterface).then((result) => {
      formikHelpers.setSubmitting(false)
      if (!getErrorMessageFromResult(result)) {
        navigate(from, { replace: true })
      } else {
        updateFormErrors(result as ErrorResultInterface, formikHelpers)
      }
    })
  }

  return (
    <div className="tw-h-screen tw-w-full tw-flex tw-items-center tw-justify-center tw-bg-transparent">
      <div className="tw-max-w-sm tw-flex-grow">
        <div className="tw-flex tw-justify-center">
          <Logo small={false} />
        </div>
        <div className="tw-shadow-md tw-rounded-lg tw-bg-white tw-mt-8 tw-px-8 tw-pt-2 tw-pb-8">
          <Form
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
            submitButtonLabel="Sign in"
            fullWidthButton
          >
            <Field name="username" label="Username" className="tw-w-full" type="text" />
            <Field name="password" label="Password" type="password" />
          </Form>
        </div>
        <div className="tw-flex tw-justify-center tw-items-center tw-text-sm tw-mt-4">
          New to <span className="tw-font-light tw-text-neutral-600 tw-pl-1">vending</span>
          <span className="tw-font-semibold tw-text-neutral-600">machine</span> ?{' '}
          <Button text="Create an account" linkTo="/signup" inverted />
        </div>
      </div>
    </div>
  )
}

export default Login
