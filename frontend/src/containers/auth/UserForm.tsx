import { useCallback, useState } from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Content from '~components/Content'
import Heading from '~components/Heading'
import {
  getErrorMessageFromResult,
  selectUser,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '~store/api'
import { useNavigate, useParams } from 'react-router-dom'
import { Field, Form } from '~components/form'
import { FormikHelpers, FormikValues } from 'formik'
import { useSelector } from 'react-redux'
import Confirm from '~components/Confirm'
import Button from '~components/Button'
import { ErrorResultInterface, updateFormErrors } from '~lib/errors'

interface UpdateInterface {
  username: string
  password1: string
  password2: string
}

const schema = yup.object().shape({
  username: yup.string().required('Please enter username.'),
  password1: yup.string().min(8),
  password2: yup.string().when('password1', {
    is: (v: string | null | undefined) => v && v.length > 0,
    then: yup
      .string()
      .min(8)
      .oneOf([yup.ref('password1'), null], 'Please retype your password.')
      .required('Please retype your password.'),
  }),
})

const UserForm = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [updateUser] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const showConfirm = () => {
    setIsConfirmOpen(true)
  }

  const hideConfirm = () => {
    setIsConfirmOpen(false)
  }

  const handleDelete = useCallback(async () => {
    const result = await deleteUser(user?.id ?? 0)
    if (!getErrorMessageFromResult(result)) {
      toast.info('Your account has been deleted.')
      navigate('/login')
    }
  }, [deleteUser, user])

  const initial = { username: user?.username ?? '', password1: '', password2: '' }

  const handleSubmit = useCallback(
    (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      const { username, password1: password } = values as UpdateInterface
      const args = password
        ? { id: user?.id ?? 0, username, password }
        : { id: user?.id ?? 0, username }
      updateUser(args).then((result) => {
        formikHelpers.setSubmitting(false)
        if (!getErrorMessageFromResult(result)) {
          toast.info('Your account has been updated.')
          navigate('/')
        } else {
          updateFormErrors(result as ErrorResultInterface, formikHelpers)
        }
      })
    },
    [user, updateUser]
  )

  return (
    <div>
      <Heading title="Edit your account">
        <Button text="Delete account" onClick={showConfirm} inverted icon="close" />
      </Heading>
      <Content hasMinHeight={false}>
        <Form
          initialValues={initial}
          validationSchema={schema}
          onSubmit={handleSubmit}
          submitButtonLabel="Save"
          className="sm:tw-w-1/2 tw-w-full"
        >
          <Field name="username" label="Username" className="tw-w-full" type="text" />
          <Field name="password1" label="New password (optional)" type="password" />
          <Field name="password2" label="Repeat new password" type="password" />
        </Form>
      </Content>
      <Confirm
        isOpen={isConfirmOpen}
        title="Delete your account"
        onClose={hideConfirm}
        onOk={handleDelete}
        okLabel="Delete"
      >
        <div>
          <p>Are you sure you want to permanently delete your account?</p>
        </div>
      </Confirm>
    </div>
  )
}

export default UserForm
