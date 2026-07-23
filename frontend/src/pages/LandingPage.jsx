import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import SectionHeader from '../components/common/SectionHeader';
import FeatureCard from '../components/common/FeatureCard';
import {
  IconTicket,
  IconLayoutDashboard,
  IconUsers,
} from '../components/icons';

const FEATURES = [
  {
    title: 'Ticket lifecycle',
    description:
      'Move issues from open to resolved with clear statuses, priorities, and a complete audit trail.',
    icon: IconTicket,
  },
  {
    title: 'Team visibility',
    description:
      'Dashboards surface open tickets, recent activity, and workload at a glance — no digging through inboxes.',
    icon: IconLayoutDashboard,
  },
  {
    title: 'Built for agents',
    description:
      'A fast, focused interface for triage and resolution — designed for support teams who need clarity, not clutter.',
    icon: IconUsers,
  },
];

function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <p className="hero__badge">Modern support ticket management</p>
          <h1 className="hero__title">
            Resolve customer issues faster, with full visibility
          </h1>
          <p className="hero__subtitle">
            SupportFlow gives your team a single place to capture, prioritize, and resolve support
            tickets — from first report to final resolution.
          </p>
          <div className="hero__actions">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Get started free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="page-section page-section--surface">
        <div className="page-section__inner">
          <SectionHeader
            title="Everything your support team needs"
            subtitle="A focused toolkit for agents and leads — without the complexity of enterprise helpdesk suites."
          />
          <div className="feature-grid">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--cta">
        <div className="page-section__inner page-section__inner--narrow">
          <SectionHeader
            title="Ready to streamline your support queue?"
            subtitle="Create an account and start managing tickets in minutes."
          />
          <div className="cta-band__actions">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Create your account
              </Button>
            </Link>
            <Link to="/about" className="cta-band__link">
              Learn more about SupportFlow
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
