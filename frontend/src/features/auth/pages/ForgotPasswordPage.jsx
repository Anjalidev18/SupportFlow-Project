import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import AuthCard from '../components/AuthCard';
import AuthFormField from '../components/AuthFormField';
import AuthFormError from '../components/AuthFormError';
import AuthFormSuccess from '../components/AuthFormSuccess';
import { useAuth } from '../context/AuthContext';
import { hasErrors, validateForgotPasswordForm } from '../utils/validation';
import { clearFieldError } from '../utils/formHelpers';

function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');

    const errors = validateForgotPasswordForm({ email });
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      const result = await forgotPassword({ email });
      setSuccessMessage(result.message);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email and we'll send reset instructions"
      footer={
        <p>
          Remember your password? <Link to="/login">Sign in</Link>
        </p>
      }
    >
      {successMessage ? (
        <AuthFormSuccess
          title="Check your inbox"
          message={successMessage}
        >
          <Link to="/login">
            <Button variant="primary" size="md">
              Return to sign in
            </Button>
          </Link>
        </AuthFormSuccess>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="auth-form" aria-label="Password reset form">
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
            hint="We'll send a reset link to this address."
            autoComplete="email"
          />

          <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-form__submit">
            Send reset link
          </Button>
        </form>
      )}
    </AuthCard>
  );
}

export default ForgotPasswordPage;
