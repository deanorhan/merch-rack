import { StackContext, Api, use, Function } from 'sst/constructs';
import { Data } from './DataStack';
import { Permissions } from './RoleStack';

export function API({ stack, app }: StackContext) {
  stack.setDefaultFunctionProps({
    runtime: 'nodejs18.x',
  });

  const { role } = use(Permissions);
  const { merchTable } = use(Data);

  stack.setDefaultFunctionProps({
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
