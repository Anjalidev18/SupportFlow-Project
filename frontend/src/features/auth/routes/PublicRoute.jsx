import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../../../components/ui/Spinner';
import { useAuth } from '../context/AuthContext';

function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="route-loader" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading</span>
        <Spinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
