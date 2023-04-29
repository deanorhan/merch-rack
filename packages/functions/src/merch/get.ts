import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ApiHandler } from 'sst/node/api';
import { Merch } from '@merch-rack/core/model/merch';

const client = new DynamoDB({ region: 'us-east-2' });
const mapper = new DataMapper({ client });

export const handler = ApiHandler(async (request) => {
  const id = request.pathParameters?.id;

  const merch = await mapper.get(new Merch({ id }));

  return {
    statusCode: 200,
    body: JSON.stringify(merch),
  };
});
