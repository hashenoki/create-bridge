import type { Request, Response } from 'express';

export const homeRoute = (req: Request, res: Response) => {
  res.json({ hello: 'world' }).end();
};
