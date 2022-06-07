import { useSelector } from 'react-redux'
import Button from '~components/Button'
import { selectDeposit, useResetMutation } from '~store/api'

const DepositInfo = () => {
  const deposit = useSelector(selectDeposit)
  const [reset] = useResetMutation()

  const handleClick = async () => {
    await reset()
  }

  return (
    <div className="tw-flex tw-justify-between">
      <div className="tw-text-sm tw-text-neutral-600 tw-mt-8">
        Deposit -{' '}
        <span className="tw-text-base tw-text-neutral-700 tw-font-semibold">{deposit} c</span>
      </div>
      <div className="tw-text-sm tw-text-neutral-600 tw-mt-6">
        <Button text="Reset" icon="back" onClick={handleClick} inverted />
      </div>
    </div>
  )
}

export default DepositInfo
