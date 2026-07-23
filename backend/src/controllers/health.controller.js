import env from '../config/env.js';
import { getDatabaseStatus } from '../config/db.js';

export function getHealth(_req, res) {
  const dbStatus = getDatabaseStatus();
  const isHealthy = dbStatus === 'connected';

  const payload = {
    status: isHealthy ? 'ok' : 'degraded',
    service: 'supportflow-api',
    version: env.apiVersion,
    timestamp: new Date().toISOString(),
    database: dbStatus,
  };

  res.status(isHealthy ? 200 : 503).json(payload);
}
