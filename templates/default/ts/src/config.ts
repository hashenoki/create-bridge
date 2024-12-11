import 'dotenv/config';
import { cleanEnv, port, str, testOnly } from 'envalid';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  PORT: port({ default: 3000 }),
});
