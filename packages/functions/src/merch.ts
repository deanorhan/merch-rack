/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiHandler } from 'sst/node/api';

export const list = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Getting a list of merch`,
  };
});

export const get = ApiHandler(async (request) => {
  return {
    statusCode: 200,
    body: `Done`,
  };
});
