import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Navbar from '~components/navigation/Navbar'
import { selectUser, useLogoutMutation } from '~store/api'

const Root = () => {
  const user = useSelector(selectUser)
  const [logout] = useLogoutMutation()

  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col">
      <div className="tw-flex-grow tw-flex tw-flex-col">
        <Navbar onLogout={logout} user={user} />
        <Outlet />
      </div>
    </div>
  )
}

export default Root
