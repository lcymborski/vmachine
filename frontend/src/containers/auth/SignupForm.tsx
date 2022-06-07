import { useCallback } from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { getErrorMessageFromResult, useSignUpMutation } from '~store/api'
import { useNavigate } from 'react-router-dom'
import { Field, Form } from '~components/form'
import { FormikHelpers, FormikValues } from 'formik'
import Logo from '~components/Logo'
import Button from '~components/Button'
import { ErrorResultInterface, updateFormErrors } from '~lib/errors'

interface SignupValues {
  username: string
  role: number
  password1: string
  password2: string
}

const schema = yup.object().shape({
  username: yup.string().required('Please enter username.'),
  role: yup.number().integer().min(1).max(2).required('Please choose your role.'),
  password1: yup.string().min(8).required('Please enter your password.'),
  password2: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password1'), null], 'Please retype your password.')
    .required('Please retype your password.'),
})

const roleOptions = [
  { value: 1, label: 'Seller' },
  { value: 2, label: 'Buyer' },
]

const SignupForm = () => {
  const navigate = useNavigate()
  const [signUp] = useSignUpMutation()

  const initial = { username: '', role: 1, password1: '', password2: '' }

  const handleSubmit = useCallback(
    (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      const { username, role, password1: password } = values as SignupValues
      const args = { username, role, password }
      signUp(args).then((result) => {
        formikHelpers.setSubmitting(false)
        if (!getErrorMessageFromResult(result)) {
          toast.info('Your account has been created. Please sign in.', { autoClose: false })
          navigate('/login')
        } else {
          updateFormErrors(result as ErrorResultInterface, formikHelpers)
        }
      })
    },
    [signUp]
  )

  return (
    <div className="tw-h-screen tw-w-full tw-flex tw-items-center tw-justify-center tw-bg-transparent">
      <div className="tw-max-w-sm tw-flex-grow">
        <div className="tw-flex tw-justify-center">
          <Logo small={false} />
        </div>
        <div className="tw-shadow-md tw-rounded-lg tw-bg-white tw-mt-8 tw-px-8 tw-pt-2 tw-pb-8">
          <Form
            initialValues={initial}
            validationSchema={schema}
            onSubmit={handleSubmit}
            submitButtonLabel="Sign up"
            fullWidthButton
          >
            <Field name="username" label="Username" type="text" />
            <Field name="role" label="Role" type="radiogroup" options={roleOptions} />
            <Field name="password1" label="Password" type="password" />
            <Field name="password2" label="Repeat password" type="password" />
          </Form>
        </div>
        <div className="tw-flex tw-justify-center tw-items-center tw-text-sm tw-mt-4">
          Already have an account? <Button text="Sign in" linkTo="/login" inverted />
        </div>
      </div>
    </div>
  )
}

export default SignupForm
