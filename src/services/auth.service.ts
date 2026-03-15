import { Response } from 'express';
import { signToken } from '@utils/jwt.js';

export function loginUser(
  res: Response,
  user: { id: string; isAdmin?: boolean }
) {
  const token = signToken({ id: user.id, isAdmin: Boolean(user.isAdmin) });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  return token;
}

export function logoutUser(res: Response) {
  res.clearCookie('token');
}

export default { loginUser, logoutUser };
