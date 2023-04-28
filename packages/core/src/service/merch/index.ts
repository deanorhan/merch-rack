import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper, QueryPaginator } from '@aws/dynamodb-data-mapper';
import { logger } from '../../logger';
import { Merch } from '../../model/merch';

const client = new DynamoDB({ region: 'us-east-2' });
const mapper = new DataMapper({ client });

export const getMerch = async (offset: string, pageSize: number): Promise<Merch[]> => {
  const paginator = new QueryPaginator(client, Merch, {}, { startKey: { merch_id: offset }, pageSize });

  const merchList: Merch[] = [];

  for await (const page of paginator) {
    page.forEach((m) => {
      logger.info(m.id);
      merchList.push(m);
    });
  }

  return merchList;
};

export const getmerchItem = async (merchId: string): Promise<Merch> => {
  const toFetch = new Merch();
  toFetch.id = merchId;

  return await mapper.get(toFetch);
};
