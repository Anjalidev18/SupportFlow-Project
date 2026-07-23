import * as reportsService from '../services/reports.service.js';

export async function getReports(_req, res) {
  const data = await reportsService.getReportsData();
  res.status(200).json({ data });
}
