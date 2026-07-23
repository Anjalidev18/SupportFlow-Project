import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import AuthCard from '../components/AuthCard';
import AuthFormField from '../components/AuthFormField';
import AuthFormError from '../components/AuthFormError';
import { useAuth } from '../context/AuthContext';
import { hasErrors, validateSignUpForm } from '../utils/validation';
import { clearFieldError } from '../utils/formHelpers';
import { mapApiDetailsToFieldErrors } from '../../../utils/apiErrors';

function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const errors = validateSignUpForm({ name, email, password, confirmPassword });
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      await register({ name, email, password });
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
      title="Create your account"
      subtitle="Get started with SupportFlow in seconds"
      footer={
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="auth-form" aria-label="Sign up form">
        <AuthFormError message={formError} />

        <AuthFormField
          id="name"
          label="Full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setFieldErrors((prev) => clearFieldError(prev, 'name'));
          }}
          error={fieldErrors.name}
          placeholder="Alex Morgan"
          autoComplete="name"
        />

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
          placeholder="At least 8 characters"
          hint="Use at least 8 characters for a secure password."
          autoComplete="new-password"
        />

        <AuthFormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setFieldErrors((prev) => clearFieldError(prev, 'confirmPassword'));
          }}
          error={fieldErrors.confirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-form__submit">
          Create account
        </Button>
      </form>
    </AuthCard>
  );
}

export default SignUpPage;
