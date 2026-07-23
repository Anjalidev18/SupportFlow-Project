import { Link, Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';

function LandingLayout() {
  return (
    <div className="landing-layout">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <footer className="landing-footer">
        <p>
          SupportFlow &mdash; Internal support ticket management &middot;{' '}
          <Link to="/about">About</Link>
        </p>
      </footer>
    </div>
  );
}

export default LandingLayout;
