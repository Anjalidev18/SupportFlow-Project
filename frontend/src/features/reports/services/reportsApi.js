import axiosClient from '../../../services/axiosClient';

export async function fetchReportsData() {
  const { data } = await axiosClient.get('/reports');
  return data.data;
}
