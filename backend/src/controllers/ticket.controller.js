import * as ticketService from '../services/ticket.service.js';

export async function listTickets(_req, res) {
  const tickets = await ticketService.getAllTickets();
  res.status(200).json({ data: tickets });
}

export async function getTicket(req, res) {
  const ticket = await ticketService.getTicketById(req.params.id);
  res.status(200).json({ data: ticket });
}

export async function createTicket(req, res) {
  const ticket = await ticketService.createTicket(req.body, req.user.id);
  res.status(201).json({ data: ticket });
}

export async function updateTicket(req, res) {
  const ticket = await ticketService.updateTicket(req.params.id, req.body);
  res.status(200).json({ data: ticket });
}

export async function deleteTicket(req, res) {
  await ticketService.deleteTicket(req.params.id);
  res.status(204).send();
}
