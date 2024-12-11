import express, { Express } from 'express';
import { auth } from './api/auth/auth.router';
import { errorHandler } from './middlewares/error-handler';
import { fallbackHandler } from './middlewares/fallback-handler';
import { env } from '~/config';

const app: Express = express();

app.enable('trust proxy');
app.disable('x-powered-by');

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (_, res) => {
  res.json('Hello World!').end();
});
app.use('/auth', auth);

// example route to throw error
app.get('/throw', (req, res, next) => {
  next(new Error('throw internal error.'));
});

// handle 404
app.all('*fallback', fallbackHandler);

// error handler
app.use(errorHandler);

// start express server and return http server instance
const server = app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});

export { app, server };
