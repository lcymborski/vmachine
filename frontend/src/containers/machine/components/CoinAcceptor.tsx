import CoinButton from './CoinButton'

const denominations = [5, 10, 20, 50, 100]

interface CoinAcceptorInterface {
  onClick: ({ value }: { value: number }) => void
}

const CoinAcceptor = ({ onClick }: CoinAcceptorInterface) => {
  return (
    <div className="tw-flex">
      {denominations.map((d) => (
        <CoinButton key={d} denomination={d} onClick={onClick} className="tw-mr-6" />
      ))}
    </div>
  )
}

export default CoinAcceptor
