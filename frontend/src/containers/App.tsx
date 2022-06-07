import { Route, Routes } from 'react-router-dom'
import NotFound from '~components/NotFound'
import RequireAuth from '~components/RequireAuth'
import RequireRole from '~components/RequireRole'
import Spinner from '~components/Spinner'
import { useGetMeQuery } from '~store/api'
import Login from './auth/Login'
import Home from './Home'
import Root from './Root'
import ToastContainer from '~components/ToastContainer'
import { RoleType } from '~types/common'
import ProductForm from './product/ProductForm'
import UserForm from './auth/UserForm'
import SignupForm from './auth/SignupForm'

const App = () => {
  // reload user data after page refresh
  const { isFetching } = useGetMeQuery()

  if (isFetching) {
    return (
      <div className="tw-min-h-screen tw-flex tw-flex-col">
        <div className="tw-flex-grow tw-flex tw-flex-col">
          <Spinner />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Root />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<UserForm />} />
          <Route
            path="/products/:productId"
            element={
              <RequireRole role={RoleType.Seller}>
                <ProductForm />
              </RequireRole>
            }
          />
          <Route
            path="/products/new"
            element={
              <RequireRole role={RoleType.Seller}>
                <ProductForm />
              </RequireRole>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
