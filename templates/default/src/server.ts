import express, { Express } from 'express';
import { healthCheck } from '~/api/health-check';
import { errorHandler } from '~/common/middlewares/error-handler';
import { fallbackHandler } from '~/common/middlewares/fallback-handler';
import { env } from '~/config';
import { homeRoute } from '~/api/home';

const app: Express = express();

app.enable('trust proxy');
app.disable('x-powered-by');

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', homeRoute);
app.use('/health-check', healthCheck);

// handle 404
app.all('*fallback', fallbackHandler);

// error handler
app.use(errorHandler);

// start express server and return http server instance
const server = app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});

export { app, server };
