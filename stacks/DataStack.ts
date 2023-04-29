import { RemovalPolicy } from 'aws-cdk-lib';
import { StackContext, Table } from 'sst/constructs';

export function Data({ stack }: StackContext) {
  // Create the DynamoDB table
  const merchTable = new Table(stack, 'merch', {
    fields: {
      merchId: 'string',
      title: 'string',
      createdAt: 'number',
    },
    primaryIndex: { partitionKey: 'merchId' },
    cdk: {
      table: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });
  return {
    merchTable,
  };
}
