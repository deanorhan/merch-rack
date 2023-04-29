import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';

const client = new DynamoDB({ region: process.env.AWS_REGION });

export const mapper = new DataMapper({ client });
