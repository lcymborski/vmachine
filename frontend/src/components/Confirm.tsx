import Modal from './Modal'
import Button from './Button'

interface ConfirmInterface {
  isOpen?: boolean
  title: string
  onOk?: () => void
  onCancel?: () => void
  onClose?: () => void
  okLabel?: string
  cancelLabel?: string
  children?: React.ReactNode
}

const Confirm = ({
  isOpen = false,
  title,
  onOk,
  onCancel,
  onClose,
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  children,
}: ConfirmInterface) => {
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleOk = () => {
    if (onOk) {
      onOk()
    }
    handleClose()
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    handleClose()
  }

  return (
    <Modal isOpen={isOpen} title={title} onClose={handleCancel}>
      <div>
        <div className="tw-py-2">{children}</div>
        <div className="tw-flex tw-items-center tw-justify-end tw-mt-6">
          <Button text={okLabel} className="tw-font-medium tw-mr-2" onClick={handleOk} />
          <Button text={cancelLabel} buttonStyle="neutral" inverted light onClick={handleCancel} />
        </div>
      </div>
    </Modal>
  )
}

export default Confirm
