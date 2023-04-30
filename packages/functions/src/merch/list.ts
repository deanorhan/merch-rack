import { mapper } from '@merch-rack/core/db';
import logger from '@merch-rack/core/logger';
import { Merch } from '@merch-rack/core/model/merch';
import { ApiHandler } from 'sst/node/api';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const handler = ApiHandler(async (request, context) => {
  logger.defaultMeta.requestId = context.awsRequestId;

  const base64Offset = request.queryStringParameters?.offset;
  let offset;
  const queryPpageSize = request.queryStringParameters?.pageSize;
  const pageSize = queryPpageSize && Number.isInteger(queryPpageSize) ? Number.parseInt(queryPpageSize) : 20;

  if (base64Offset !== undefined) {
    const stringOffset = Buffer.from(base64Offset, 'base64').toString('binary');
    logger.info(`String: ${stringOffset}`);

    offset = JSON.parse(stringOffset);
  }

  const paginator = mapper
    .query(
      Merch,
      { status: 1 },
      {
        limit: pageSize,
        indexName: 'merchStatus',
        startKey: offset,
      }
    )
    .pages();

  const merchList: Merch[] = [];

  for await (const page of paginator) {
    page.forEach((m) => {
      logger.info(`Query: ${m.merchId}`);
      merchList.push(m);
    });
  }

  const response = {
    merch: JSON.stringify(merchList),
    offset,
    pageSize,
  };

  response.offset = undefined;
  if (paginator.lastEvaluatedKey !== undefined) {
    response.offset = Buffer.from(JSON.stringify(paginator.lastEvaluatedKey), 'binary').toString('base64');
    logger.info(`Query base64 offset: ${response.offset}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
});
