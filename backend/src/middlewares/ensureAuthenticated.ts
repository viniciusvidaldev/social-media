import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AppError } from '../errors/AppError';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  const { JWT_SECRET } = process.env;

  if (!authorization) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const { id } = jwt.verify(token, String(JWT_SECRET)) as TokenPayload;

    request.userId = id;

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
