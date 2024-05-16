import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PORT: number;
  DB_SYNC: boolean;

  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),

    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_SYNC: joi.boolean().required(),

    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  db_user: envVars.DB_USER,
  db_pass: envVars.DB_PASS,
  db_host: envVars.DB_HOST,
  db_name: envVars.DB_NAME,
  db_port: envVars.DB_PORT,
  db_sync: envVars.DB_SYNC,
  jwt_secret: envVars.JWT_SECRET,
};
