import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error logged from middleware:', error);

const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    isValid: false,
    error: error.message || 'Internal server error'
  });
};

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: `Route ${req.method} ${req.path} not found`
  });
};