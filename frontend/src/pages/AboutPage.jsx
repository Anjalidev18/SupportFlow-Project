import Card from '../components/ui/Card';
import SectionHeader from '../components/common/SectionHeader';
import FeatureCard from '../components/common/FeatureCard';
import {
  IconTicket,
  IconLayoutDashboard,
  IconCircleDot,
  IconClock,
  IconCheckCircle,
  IconUsers,
} from '../components/icons';

const FEATURES = [
  {
    title: 'Ticket Management',
    description: 'Create, view, and manage support tickets with a clear lifecycle from open to resolved.',
    icon: IconTicket,
  },
  {
    title: 'Dashboard Overview',
    description: 'Monitor ticket volume, status breakdown, and team activity from a single command center.',
    icon: IconLayoutDashboard,
  },
  {
    title: 'Status Tracking',
    description: 'Track tickets through Open, In Progress, and Resolved states with full visibility.',
    icon: IconCircleDot,
  },
  {
    title: 'Priority Management',
    description: 'Assign Low, Medium, or High priority to triage issues and focus on what matters most.',
    icon: IconClock,
  },
];

const CAPABILITIES = [
  {
    title: 'Create and manage support tickets',
    description:
      'Log customer issues with titles, descriptions, and priorities — everything your team needs in one record.',
    icon: IconTicket,
  },
  {
    title: 'Track ticket status in one place',
    description:
      'See whether work is open, in progress, or resolved without chasing updates across email threads.',
    icon: IconCircleDot,
  },
  {
    title: 'Organize work by priority',
    description:
      'Use Low, Medium, and High priority levels to focus on urgent issues first and keep the queue manageable.',
    icon: IconClock,
  },
  {
    title: 'View ticket activity and progress',
    description:
      'Follow recent team actions and ticket updates from your dashboard so nothing falls through the cracks.',
    icon: IconLayoutDashboard,
  },
  {
    title: 'Secure authentication',
    description:
      'Sign in to a protected workspace so your team\'s support data stays accessible only to authorized users.',
    icon: IconUsers,
  },
  {
    title: 'Responsive experience across devices',
    description:
      'Work from your desk or on the go — SupportFlow adapts to desktop, tablet, and mobile screens.',
    icon: IconCheckCircle,
  },
];

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__inner">
          <p className="about-hero__eyebrow">About SupportFlow</p>
          <h1 className="about-hero__title">Built for teams who care about support quality</h1>
          <p className="about-hero__subtitle">
            SupportFlow is an internal support ticket management platform designed to help teams
            capture, track, and resolve customer issues with clarity and accountability.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-section__inner">
          <SectionHeader
            title="Project Overview"
            subtitle="A focused platform for internal support teams who need structure without enterprise overhead."
            align="left"
          />
          <div className="about-overview">
            <Card title="What is SupportFlow?">
              <p>
                SupportFlow is a modern web application for internal support teams. It provides a
                centralized workspace to log customer issues, assign ownership, track status, and
                document resolutions — without the overhead of enterprise helpdesk suites.
              </p>
            </Card>
            <Card title="The problem it solves">
              <p>
                Support teams often juggle tickets across email threads, spreadsheets, and ad-hoc
                tools. Issues get lost, accountability is unclear, and managers lack visibility into
                workload. SupportFlow brings structure to that chaos.
              </p>
            </Card>
            <Card title="Who it's for">
              <p>
                Support agents, team leads, and internal operations teams who need a shared queue,
                clear priorities, and a dashboard that shows what needs attention right now.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="page-section page-section--surface">
        <div className="page-section__inner">
          <SectionHeader
            title="Key Features"
            subtitle="Core capabilities that help your team stay organized and responsive."
          />
          <div className="feature-grid feature-grid--two">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-section__inner">
          <SectionHeader
            title="What you can do with SupportFlow"
            subtitle="Everything you need to run an effective internal support operation — designed for the people doing the work."
          />
          <div className="feature-grid feature-grid--three">
            {CAPABILITIES.map((capability) => (
              <FeatureCard key={capability.title} {...capability} hover={false} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
