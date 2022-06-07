import cx from 'classnames'
import Delayed from './Delayed'

interface SpinnerInterface {
  delay?: number
  className?: string
}

const Spinner = ({ className, delay = 500 }: SpinnerInterface) => (
  <Delayed delay={delay}>
    <div
      className={cx(
        'tw-absolute tw-inset-0 tw-flex tw-items-center',
        'tw-justify-center',
        className
      )}
    >
      <svg
        viewBox="0 0 44 44"
        xmlns="http://www.w3.org/2000/svg"
        className="tw-stroke-primary-500 tw-w-24 tw-h-24"
      >
        <g fill="none" fillRule="evenodd" strokeWidth="2">
          <circle cx="22" cy="22" r="1">
            <animate
              attributeName="r"
              begin="0s"
              dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="0s"
              dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="22" cy="22" r="1">
            <animate
              attributeName="r"
              begin="-0.9s"
              dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="-0.9s"
              dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  </Delayed>
)

export default Spinner
