import { useSelector } from 'react-redux'
import { selectUser } from '~store/api'
import { RoleType } from '~types/common'
import VendingMachine from './machine/VendingMachine'
import ProductList from './product/ProductList'

const Home = () => {
  const user = useSelector(selectUser)

  if (user && user.role === RoleType.Seller) {
    return <ProductList />
  }

  return <VendingMachine />
}

export default Home
