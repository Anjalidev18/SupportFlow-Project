import * as dashboardService from '../services/dashboard.service.js';

export async function getDashboard(req, res) {
  const data = await dashboardService.getDashboardData();
  res.status(200).json({ data });
}
