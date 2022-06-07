import cx from 'classnames'

const Logo = ({ small = true }: { small: boolean }) => (
  <div
    className={cx(
      {
        'tw-text-2xl': small,
        'tw-text-4xl': !small,
      },
      'tw-inline-flex',
      'tw-items-center',
      'tw-flex-no-wrap',
      'tw-whitespace-nowrap'
    )}
  >
    <div>
      <span className="tw-font-light tw-text-neutral-600">vending</span>
      <span className="tw-font-semibold tw-text-neutral-600 tw-pl-1">machine</span>
    </div>
  </div>
)

export default Logo
