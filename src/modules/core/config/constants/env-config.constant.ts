// database
const DATABASE = {
  DATABASE_URL: 'DATABASE_URL',
} as const;

const REDIS = {
  REDIS_HOST: 'REDIS_HOST',
  REDIS_PORT: 'REDIS_PORT',
} as const;

const ENV_KEY = {
  SERVER_PORT: 'SERVER_PORT',
  NODE_ENV: 'NODE_ENV',
  ...DATABASE,
  ...REDIS,
} as const;

export default ENV_KEY;
