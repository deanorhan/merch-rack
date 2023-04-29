import { Effect, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { StackContext } from 'sst/constructs';

export function Permissions({ stack }: StackContext) {
  const role = new Role(stack, 'LambdaRole', {
    assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
  });

  role.addToPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['dynamodb:PutItem'],
      resources: ['arn:aws:dynamodb:us-east-2:720067309267:table/*'],
    })
  );

  role.addToPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['logs:*'],
      resources: ['*'],
    })
  );

  return {
    role,
  };
}
