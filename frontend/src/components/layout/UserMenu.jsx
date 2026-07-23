import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChevronDown } from '../icons';
import { useAuth } from '../../features/auth/context/AuthContext';

function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '?';

  useEffect(() => {
    if (!open) return undefined;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  function handleLogout() {
    setOpen(false);
    logout();
    navigate('/login', { replace: true });
  }

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        ref={triggerRef}
        type="button"
        className="user-menu__trigger"
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`User menu for ${user?.name}`}
      >
        <div className="user-menu__avatar" aria-hidden="true">
          <span className="user-menu__avatar-text">{initials}</span>
        </div>
        <div className="user-menu__info">
          <span className="user-menu__name">{user?.name}</span>
          <span className="user-menu__email">{user?.email}</span>
        </div>
        <IconChevronDown size={14} className="user-menu__chevron" aria-hidden="true" />
      </button>

      {open && (
        <ul className="user-menu__dropdown" role="menu" aria-label="User options">
          <li role="none">
            <button
              type="button"
              className="user-menu__item user-menu__item--danger"
              role="menuitem"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
