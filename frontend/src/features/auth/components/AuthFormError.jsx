function AuthFormError({ message }) {
  if (!message) return null;

  return (
    <div className="alert alert--error auth-form-error" role="alert">
      {message}
    </div>
  );
}

export default AuthFormError;
