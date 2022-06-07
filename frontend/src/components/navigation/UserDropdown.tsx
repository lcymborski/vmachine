import cx from 'classnames'
import { Link } from 'react-router-dom'
import Dropdown from '~components/Dropdown'
import { UserInterface } from '~types/state'

const styles = {
  button: cx(
    'tw-flex tw-text-sm tw-border-2 tw-rounded-full tw-border-white',
    'focus:tw-outline-none focus:tw-shadow-outline tw-shadow-md',
    'tw-transition tw-duration-150 tw-ease-in-out',
    'tw-h-8 tw-w-8 bg-user tw-bg-white focus:tw-bg-neutral-100'
  ),
  link: cx(
    'tw-block tw-px-4 tw-py-2 tw-text-sm tw-leading-5 tw-text-neutral-700',
    'hover:tw-bg-neutral-100 focus:tw-outline-none focus:tw-bg-neutral-100',
    'tw-transition tw-duration-150 tw-ease-in-out tw-w-full tw-text-center'
  ),
}

interface UserDropdownInterface {
  user?: UserInterface
  onLogout: () => void
}

const UserDropdown = ({ user, onLogout }: UserDropdownInterface) => (
  <Dropdown
    menuId="user-menu"
    menuLabel="User menu"
    className="tw-ml-1"
    buttonClassName={styles.button}
  >
    {(close) => (
      <>
        {user && (
          <div className="tw-px-4 tw-py-4 tw-text-sm tw-text-center tw-flex tw-flex-col tw-justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={cx(
                'tw-h-12 tw-w-12 tw-rounded-full tw-border-2',
                'tw-border-neutral-200 tw-bg-neutral-200 tw-text-neutral-400',
                'tw-self-center tw-fill-current'
              )}
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
            </svg>
            <div className="tw-text-neutral-700 tw-mt-2 tw-font-medium tw-text-base">{`${user.username}`}</div>
          </div>
        )}
        <Link to="/account" className={styles.link} onClick={close}>
          Edit your account
        </Link>
        <button
          className={styles.link}
          type="button"
          onClick={() => {
            close()
            if (onLogout) {
              onLogout()
            }
          }}
        >
          Sign out
        </button>
      </>
    )}
  </Dropdown>
)

export default UserDropdown
