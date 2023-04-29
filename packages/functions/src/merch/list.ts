/* eslint-disable @typescript-eslint/no-unused-vars */
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ApiHandler } from 'sst/node/api';

const client = new DynamoDB({ region: 'us-east-2' });
const mapper = new DataMapper({ client });

export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Getting a list of merch`,
  };
});
