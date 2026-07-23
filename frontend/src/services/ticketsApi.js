import axiosClient from './axiosClient';

export async function fetchTickets() {
  const { data } = await axiosClient.get('/tickets');
  return data.data;
}

export async function fetchTicketById(id) {
  const { data } = await axiosClient.get(`/tickets/${id}`);
  return data.data;
}

export async function createTicket(payload) {
  const { data } = await axiosClient.post('/tickets', payload);
  return data.data;
}

export async function updateTicket(id, payload) {
  const { data } = await axiosClient.put(`/tickets/${id}`, payload);
  return data.data;
}

export async function deleteTicket(id) {
  await axiosClient.delete(`/tickets/${id}`);
}
