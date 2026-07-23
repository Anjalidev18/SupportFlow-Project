import { Link } from 'react-router-dom';
import {
  IconActivityCreated,
  IconActivityAssigned,
  IconActivityResolved,
  IconActivityComment,
  IconActivityStatus,
} from '../icons';
import { formatRelativeTime, formatActivityMessage } from '../../utils/format';

const ACTION_ICONS = {
  created: IconActivityCreated,
  assigned: IconActivityAssigned,
  resolved: IconActivityResolved,
  commented: IconActivityComment,
  status_changed: IconActivityStatus,
};

function ActivityFeed({ activities }) {
  return (
    <div className="activity-feed">
      <h2 className="activity-feed__title">Recent Activity</h2>
      <ul className="activity-feed__list">
        {activities.map((activity) => {
          const ActionIcon = ACTION_ICONS[activity.action] || IconActivityComment;

          return (
            <li key={activity.id} className="activity-feed__item">
              <div className="activity-feed__icon" aria-hidden="true">
                <ActionIcon size={14} />
              </div>
              <div className="activity-feed__content">
                <p className="activity-feed__text">
                  <strong>{activity.actor}</strong>{' '}
                  {formatActivityMessage(activity)}
                </p>
                <p className="activity-feed__meta">
                  <Link to="/tickets" className="activity-feed__link">
                    {activity.targetTitle}
                  </Link>
                  {' · '}
                  <time dateTime={activity.timestamp}>
                    {formatRelativeTime(activity.timestamp)}
                  </time>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ActivityFeed;
