import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ApiHandler } from 'sst/node/api';
import { Merch } from '@merch-rack/core/model/merch';
import { randomUUID } from 'crypto';

const client = new DynamoDB({ region: process.env.AWS_REGION });
const mapper = new DataMapper({ client });

export const handler = ApiHandler(async (request) => {
  const data: Merch = JSON.parse(request.body || '{}');

  const newMerch = new Merch({
    id: randomUUID(),
    title: data.title,
    createdAt: Date.now(),
  });

  await mapper.put(newMerch);

  return {
    statusCode: 201,
    headers: {
      location: `/merch/${newMerch.id}`,
    },
  };
});
