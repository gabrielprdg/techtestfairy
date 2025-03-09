import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adiciona a propriedade `user` ao Request
    }
  }
}