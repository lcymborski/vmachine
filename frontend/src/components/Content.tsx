import cx from 'classnames'

interface ContentInterface {
  padded?: boolean
  hasBorder?: boolean
  hasMinHeight?: boolean
  hasCard?: boolean
  fillHeight?: boolean
  className?: string
  title?: string
  subtitle?: string
  children?: React.ReactNode
}

const Content = ({
  padded = true,
  hasBorder = false,
  hasMinHeight = true,
  hasCard = true,
  fillHeight,
  className,
  title,
  subtitle,
  children,
}: ContentInterface) => (
  <div
    className={cx({
      // 'tw-bg-neutral-100': true,
      'tw-bg-transparent': true,
      'tw-px-3': padded,
      'sm:tw-px-6': padded,
      'lg:tw-px-8': padded,
      // 'tw-pt-2': padded,
      'tw-pb-8': padded,
      'tw-border-t': hasBorder,
      'tw-border-b': hasBorder,
      'tw-border-neutral-300': hasBorder,
      'tw-flex tw-flex-col tw-flex-grow': fillHeight,
    })}
    style={hasMinHeight ? { minHeight: '70vh' } : {}}
  >
    <div
      className={cx(
        'tw-relative',
        {
          'tw-bg-white tw-pt-4 tw-pb-8': hasCard,
          'tw-px-8': hasCard && !title,
          'tw-shadow sm:tw-rounded-lg': hasCard,
          'tw-flex tw-flex-col tw-flex-grow': fillHeight,
        },
        ...(className ? [className] : [])
      )}
      style={hasMinHeight ? { minHeight: '65vh' } : {}}
    >
      {!!title && hasCard && (
        <>
          <div className="tw-px-6 tw-pb-4 tw-border-b tw-border-neutral-100">
            <div className="tw-text-xl tw-text-neutral-700 tw-font-medium">{title}</div>
            {subtitle && <div className="tw-text-sm tw-pt-1 tw-text-neutral-400">{subtitle}</div>}
          </div>
          <div>{children}</div>
        </>
      )}
      {(!title || !hasCard) && <>{children}</>}
    </div>
  </div>
)

export default Content
