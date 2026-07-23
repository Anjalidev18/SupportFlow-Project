import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import AuthCard from '../components/AuthCard';
import AuthFormField from '../components/AuthFormField';
import AuthFormError from '../components/AuthFormError';
import { useAuth } from '../context/AuthContext';
import { hasErrors, validateLoginForm } from '../utils/validation';
import { clearFieldError } from '../utils/formHelpers';
import { mapApiDetailsToFieldErrors } from '../../../utils/apiErrors';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const errors = validateLoginForm({ email, password });
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (err.details?.length) {
        setFieldErrors(mapApiDetailsToFieldErrors(err.details));
      }
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your SupportFlow account"
      footer={
        <p>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="auth-form" aria-label="Sign in form">
        <AuthFormError message={formError} />

        <AuthFormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors((prev) => clearFieldError(prev, 'email'));
          }}
          error={fieldErrors.email}
          placeholder="you@company.com"
          autoComplete="email"
        />

        <AuthFormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors((prev) => clearFieldError(prev, 'password'));
          }}
          error={fieldErrors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div className="auth-form__actions">
          <Link to="/forgot-password" className="auth-form__link">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-form__submit">
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}

export default LoginPage;
