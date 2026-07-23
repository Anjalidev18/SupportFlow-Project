import axiosClient from '../../../services/axiosClient';

/**
 * Fetches all dashboard data from the API.
 * @returns {Promise<import('../types').DashboardData>}
 */
export async function fetchDashboardData() {
  const { data } = await axiosClient.get('/dashboard');
  return data.data;
}
