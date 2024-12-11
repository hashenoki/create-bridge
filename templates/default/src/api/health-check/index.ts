import { Router } from 'express';

export const healthCheck: Router = Router();

healthCheck.get('/', (req, res) => {
  res.json({ status: 'ok' }).end();
});
