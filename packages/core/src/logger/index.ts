import { createLogger, format } from 'winston';
import { Console } from 'winston/lib/winston/transports';

const { combine, json, timestamp } = format;

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {},
  format: combine(timestamp(), json()),
  transports: [new Console()],
});
