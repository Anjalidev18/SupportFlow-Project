function Toast({ toast, onDismiss }) {
  if (!toast) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast toast--${toast.type}`}>
        <span className="toast__message">{toast.message}</span>
        <button
          type="button"
          className="toast__close"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
