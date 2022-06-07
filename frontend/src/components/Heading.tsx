import cx from 'classnames'

interface HeadingInterface {
  title?: string
  fullWidth?: boolean
  children?: React.ReactNode
}

const Heading = ({ title = '', fullWidth = true, children }: HeadingInterface) => (
  <div
    className={cx(
      'tw-inline-flex tw-items-center tw-w-full tw-items-center',
      'tw-mt-6 tw-px-3 sm:tw-px-6 lg:tw-px-8 tw-py-4',
      {
        'tw-justify-end': fullWidth,
        'tw-justify-start': !fullWidth,
      }
    )}
  >
    <h1
      className={cx('tw-text-xl tw-text-neutral-600 tw-text-center', {
        'tw-mr-auto': fullWidth,
        'tw-bg-white tw-shadow tw-px-4 tw-py-3 tw-rounded-md': false,
      })}
    >
      {title}
    </h1>
    <div>{children}</div>
  </div>
)

export default Heading
