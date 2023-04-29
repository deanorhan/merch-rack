import { ApiHandler } from 'sst/node/api';
import logger from '@merch-rack/core/logger';
import { Merch } from '@merch-rack/core/model/merch';
import { mapper } from '@merch-rack/core/db';

export const handler = ApiHandler(async (request, context) => {
  logger.defaultMeta.requestId = context.awsRequestId;

  const id = request.pathParameters?.id;

  const response = await mapper
    .get(new Merch({ id }))
    .then((merch) => {
      return {
        statusCode: 200,
        body: JSON.stringify(merch),
      };
    })
    .catch((err) => {
      logger.error(err);

      return {
        statusCode: err.statusCode,
        body: err.message,
      };
    });

  return response;
});
