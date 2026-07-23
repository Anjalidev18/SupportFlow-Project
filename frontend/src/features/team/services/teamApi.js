import axiosClient from '../../../services/axiosClient';

export async function fetchTeamMembers() {
  const { data } = await axiosClient.get('/team');
  return data.data;
}

export async function createTeamMember(payload) {
  const { data } = await axiosClient.post('/team', payload);
  return data.data;
}

export async function updateTeamMember(id, payload) {
  const { data } = await axiosClient.put(`/team/${id}`, payload);
  return data.data;
}

export async function deleteTeamMember(id) {
  await axiosClient.delete(`/team/${id}`);
}
