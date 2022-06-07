import { Formik, FormikConfig, FormikValues, Form as FormikForm } from 'formik'
import Button from '~components/Button'
import FormErrors from './FormErrors'

interface FormInterface extends FormikConfig<FormikValues> {
  children?: React.ReactNode
  submitButtonLabel: string
  hasSubmitButton?: boolean
  fullWidthButton?: boolean
  className?: string
}

const Form = ({
  initialValues,
  submitButtonLabel,
  hasSubmitButton = true,
  fullWidthButton = false,
  onSubmit,
  validationSchema,
  className,
  enableReinitialize = true,
  children,
}: FormInterface) => {
  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize={enableReinitialize}
      >
        <FormikForm>
          {children}
          <FormErrors />
          {hasSubmitButton && (
            <Button
              type="submit"
              text={submitButtonLabel}
              fullWidth={fullWidthButton}
              className="tw-mt-6"
            />
          )}
        </FormikForm>
      </Formik>
    </div>
  )
}

export default Form
