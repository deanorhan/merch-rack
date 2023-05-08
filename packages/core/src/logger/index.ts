import { createLogger, format, transports } from 'winston';
import { Console } from 'winston/lib/winston/transports';
import WinstonCloudwatch from 'winston-cloudwatch';
import moment from 'moment';

const { combine, json, timestamp, simple } = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    lambda: process.env.AWS_LAMBDA_FUNCTION_NAME,
    traceId: process.env._X_AMZN_TRACE_ID,
    region: process.env.AWS_REGION,
  },
  format: combine(timestamp(), json()),
  transports: [new Console()],
});

const logGroupName = `lambda/${process.env.SST_APP}`;
const logStreamName = `${moment().format('YYYY/MM/DD')}/[${process.env.AWS_LAMBDA_FUNCTION_VERSION}]${
  process.env.SST_FUNCTION_ID
}`;

logger.add(
  new WinstonCloudwatch({
    logGroupName,
    logStreamName,
    awsRegion: process.env.AWS_REGION,
    jsonMessage: true,
  })
);

export default logger;
