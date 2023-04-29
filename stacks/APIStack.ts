import { StackContext, Api, use } from 'sst/constructs';
import { Data } from './DataStack';
import { Permissions } from './RoleStack';

export function API({ stack }: StackContext) {
  stack.setDefaultFunctionProps({
    runtime: 'nodejs18.x',
  });

  const { role } = use(Permissions);
  const { merchTable } = use(Data);

  stack.setDefaultFunctionProps({
    role,
  });

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [merchTable],
      },
    },
    routes: {
      'GET /merch': 'packages/functions/src/merch/list.handler',
      'POST /merch': 'packages/functions/src/merch/create.handler',
      'GET /merch/{id}': 'packages/functions/src/merch/get.handler',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
