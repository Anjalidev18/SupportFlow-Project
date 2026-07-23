import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import UserMenu from './UserMenu';
import { IconSearch, IconMenu, IconPlus } from '../icons';
import { useTicketActions } from '../../features/tickets/context/TicketActionsContext';

function TopNav({ onMenuClick }) {
  const navigate = useNavigate();
  const { openCreateModal } = useTicketActions();

  function handleSearchKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/tickets');
    }
  }

  return (
    <header className="top-nav">
      <div className="top-nav__left">
        <button
          type="button"
          className="top-nav__menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <IconMenu size={20} />
        </button>

        <div className="top-nav__search">
          <IconSearch size={16} aria-hidden="true" />
          <input
            type="search"
            className="top-nav__search-input"
            placeholder="Search tickets..."
            aria-label="Search tickets"
            onKeyDown={handleSearchKeyDown}
          />
          <kbd className="top-nav__shortcut" aria-hidden="true">
            /
          </kbd>
        </div>
      </div>

      <div className="top-nav__right">
        <Button
          variant="primary"
          size="sm"
          className="top-nav__create-btn"
          onClick={openCreateModal}
          aria-label="Create new ticket"
        >
          <IconPlus size={16} />
          <span>New ticket</span>
        </Button>

        <UserMenu />
      </div>
    </header>
  );
}

export default TopNav;
