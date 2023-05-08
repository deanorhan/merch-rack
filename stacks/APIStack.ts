import { StackContext, Api, use } from 'sst/constructs';
import { Data } from './DataStack';
import { Permissions } from './RoleStack';

export function API({ stack }: StackContext) {
  const { role } = use(Permissions);
  const { merchTable } = use(Data);

  stack.setDefaultFunctionProps({
    runtime: 'nodejs18.x',
    role,
  });

  stack.addDefaultFunctionBinding([merchTable]);

  // new Function(stack, 'list-merch', {
  //   handler: 'packages/functions/src/merch/list.handler',
  // });

  const api = new Api(stack, 'api', {
    routes: {
      'GET /merch': 'packages/functions/src/merch/list.handler',
      'POST /merch': 'packages/functions/src/merch/create.handler',
      'GET /merch/{merchId}': 'packages/functions/src/merch/get.handler',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
