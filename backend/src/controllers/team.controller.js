import * as teamService from '../services/team.service.js';

export async function listMembers(_req, res) {
  const members = await teamService.getAllMembers();
  res.status(200).json({ data: members });
}

export async function getMember(req, res) {
  const member = await teamService.getMemberById(req.params.id);
  res.status(200).json({ data: member });
}

export async function createMember(req, res) {
  const member = await teamService.createMember(req.body);
  res.status(201).json({ data: member });
}

export async function updateMember(req, res) {
  const member = await teamService.updateMember(req.params.id, req.body);
  res.status(200).json({ data: member });
}

export async function deleteMember(req, res) {
  await teamService.deleteMember(req.params.id, req.user.id);
  res.status(204).send();
}
