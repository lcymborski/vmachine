import { ToastContainer as ReactToastContainer } from 'react-toastify'

const ToastContainer = () => (
  <ReactToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    draggable
    pauseOnHover
  />
)

export default ToastContainer
