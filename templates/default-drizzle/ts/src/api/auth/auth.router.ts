import { Router } from 'express';

const auth: Router = Router();

auth.get('/', (req, res) => {
  res.json({ kind: 'auth', route: req.route }).end();
});

export { auth };
