import { StackContext, Api, Table } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const table = new Table(stack, 'Notes', {
    fields: {
      merchId: 'string',
      title: 'string',
    },
    primaryIndex: { partitionKey: 'merchId' },
  });

  stack.setDefaultFunctionProps({
    runtime: 'nodejs18.x',
  });

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      'GET /merch': 'packages/functions/src/merch.list',
      'GET /merch/{id}': 'packages/functions/src/merch.get',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
