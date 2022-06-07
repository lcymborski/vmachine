import { useState, useRef, useCallback } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { useOnClickOutside } from '~lib/hooks'
import Logo from '~components/Logo'
import UserDropdown from './UserDropdown'
import { UserInterface } from '~types/state'

const styles = {
  link: cx(
    'tw-block tw-px-4 tw-py-2 tw-text-sm tw-leading-5 tw-text-neutral-700',
    'hover:tw-bg-neutral-100 focus:tw-outline-none focus:tw-bg-neutral-100',
    'tw-transition tw-duration-150 tw-ease-in-out'
  ),
  mobileMenu: cx(
    'tw-flex tw-flex-col tw-justify-start tw-bg-white',
    'tw-fixed tw-top-0 tw-left-0 tw-h-screen tw-w-screen',
    'tw-transition tw-duration-300 tw-ease-in-out tw-transform'
  ),
}

interface NavbarInterface {
  user?: UserInterface
  onLogout: () => void
}

const Navbar = ({ user, onLogout }: NavbarInterface) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileNodeRef = useRef(null)

  useOnClickOutside(mobileNodeRef, () => setMobileMenuOpen(false))

  const handleBurgerClick = useCallback(
    () => setMobileMenuOpen((prev) => !prev),
    [setMobileMenuOpen]
  )

  const handleLogoutClick = () => {
    if (onLogout) {
      setMobileMenuOpen(false)
      onLogout()
    }
  }

  const handleMobileLinkClick = () => setMobileMenuOpen(false)

  return (
    <nav className="tw-bg-transparent">
      <div className="tw-mx-auto tw-px-3 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-relative tw-flex tw-justify-between tw-items-center tw-h-16">
          <div className="tw-flex-1 tw-flex tw-justify-center sm:tw-justify-start tw-items-center">
            <div className="tw-flex-shrink-0 tw-flex tw-justify-start tw-items-center">
              <Link to="/" className="focus:tw-outline-none">
                <div className="tw-block">
                  <Logo small />
                </div>
              </Link>
            </div>
          </div>
          <div
            className={cx(
              'tw-absolute tw-inset-y-0 tw-right-0',
              'tw-flex tw-items-center sm:tw-static sm:tw-inset-auto',
              'sm:tw-ml-6 sm:tw-pr-0'
            )}
          >
            <UserDropdown user={user} onLogout={handleLogoutClick} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
