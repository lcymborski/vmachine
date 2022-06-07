import cx from 'classnames'
import ReactModal from 'react-modal'

interface ModalInterface {
  isOpen?: boolean
  title: string
  onClose: () => void
  isCloseShown?: boolean
  children?: React.ReactNode
}

ReactModal.setAppElement('body')

const Modal = ({
  isOpen = false,
  title,
  onClose,
  isCloseShown = true,
  children,
}: ModalInterface) => (
  <ReactModal
    isOpen={isOpen}
    contentLabel={title}
    onRequestClose={onClose}
    className={{
      base: cx('modal', 'modal-normal'),
      afterOpen: 'modal-after-open',
      beforeClose: 'modal-before-close',
    }}
    overlayClassName={{
      base: 'modal-overlay',
      afterOpen: 'modal-overlay-after-open',
      beforeClose: 'modal-overlay-before-close',
    }}
    shouldCloseOnOverlayClick={false}
    shouldCloseOnEsc={false}
    closeTimeoutMS={300}
  >
    <h3 className={cx('', 'tw-pt-2 tw-pb-3 tw-mt-0 tw-mb-4 tw-font-semibold tw-text-xl')}>
      {title}
    </h3>
    {isCloseShown && (
      <div className="tw-absolute tw-inline-block tw-top-0 tw-right-0 tw-m-4 tw-z-10">
        <button
          type="button"
          onClick={onClose}
          className="tw--mr-1 tw-flex tw-p-2 tw-rounded-md focus:tw-outline-none"
        >
          <svg
            className="tw-h-6 tw-w-6 tw-text-primary-500 hover:tw-text-primary-700"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    )}
    <div>{children}</div>
  </ReactModal>
)

export default Modal
