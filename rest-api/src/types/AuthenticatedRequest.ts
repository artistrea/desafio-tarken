import { Request } from 'express';

export type JWTPayload = {
  id: number;
  email: string;
};
export type AuthenticatedRequest = Request & { current_user: JWTPayload };
