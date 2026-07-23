import * as authService from '../services/auth.service.js';

export async function register(req, res) {
  const result = await authService.registerUser(req.body);
  res.status(201).json({ data: result });
}

export async function login(req, res) {
  const result = await authService.loginUser(req.body);
  res.status(200).json({ data: result });
}

export async function logout(_req, res) {
  res.status(204).send();
}

export async function me(req, res) {
  res.status(200).json({ data: { user: req.user } });
}
