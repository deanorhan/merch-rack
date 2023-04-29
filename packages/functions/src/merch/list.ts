import { ApiHandler } from 'sst/node/api';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Getting a list of merch`,
  };
});
