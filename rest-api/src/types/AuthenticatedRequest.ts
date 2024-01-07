import { Request } from 'express';

export type AuthenticatedRequest = Request & { current_user: string };
