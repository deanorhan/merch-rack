import { ApiHandler } from 'sst/node/api';
import logger from '@merch-rack/core/logger';
import { Merch } from '@merch-rack/core/model/merch';
import { mapper } from '@merch-rack/core/db';
import { GenericProblem } from '@merch-rack/core/error';

export const handler = ApiHandler(async (request, context) => {
  logger.defaultMeta.requestId = context.awsRequestId;

  const merch = new Merch({ merchId: request.pathParameters?.merchId });

  const response = await mapper
    .get({ item: merch })
    .then((merch) => {
      return {
        statusCode: 200,
        body: JSON.stringify(merch),
      };
    })
    .catch((err) => {
      logger.error(err);

      return {
        headers: {
          'Content-Type': 'application/problem+json',
        },
        statusCode: err.statusCode,
        body: JSON.stringify(new GenericProblem('', err.message)),
      };
    });

  return response;
});
