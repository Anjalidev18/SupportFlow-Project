import { Link, NavLink, useLocation } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';
import Button from '../ui/Button';

function PublicHeader() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className="landing-header">
      <div className="landing-header__inner">
        <BrandLogo />

        <nav className="landing-header__nav" aria-label="Main navigation">
          {isLanding ? (
            <a href="#features" className="landing-header__link">
              Features
            </a>
          ) : (
            <Link to="/#features" className="landing-header__link">
              Features
            </Link>
          )}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `landing-header__link ${isActive ? 'landing-header__link--active' : ''}`
            }
          >
            About
          </NavLink>

          <div className="landing-header__auth">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default PublicHeader;
