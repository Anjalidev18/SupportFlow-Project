import { Link } from 'react-router-dom';

function BrandLogo({ size = 28, showName = true, className = '' }) {
  return (
    <Link to="/" className={`brand-logo ${className}`.trim()} aria-label="SupportFlow home">
      <span className="brand-logo__icon" aria-hidden="true">
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#2563EB" />
          <path
            d="M8 12h16M8 16h12M8 20h8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {showName && <span className="brand-logo__name">SupportFlow</span>}
    </Link>
  );
}

export default BrandLogo;
