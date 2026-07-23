import { Link, Outlet } from 'react-router-dom';
import BrandLogo from '../../../components/common/BrandLogo';

function AuthLayout() {
  return (
    <div className="auth-layout">
      <header className="auth-layout__header">
        <BrandLogo />
      </header>
      <main className="auth-layout__main">
        <Outlet />
      </main>
      <footer className="auth-layout__footer">
        <p>
          <Link to="/">Back to home</Link>
          <span aria-hidden="true"> · </span>
          <Link to="/about">About</Link>
        </p>
      </footer>
    </div>
  );
}

export default AuthLayout;
