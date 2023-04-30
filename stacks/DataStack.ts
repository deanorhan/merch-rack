import { RemovalPolicy } from 'aws-cdk-lib';
import { StackContext, Table } from 'sst/constructs';

export function Data({ stack }: StackContext) {
  const merchTable = new Table(stack, 'merch', {
    fields: {
      merchId: 'string',
      status: 'number',
      vendor: 'string',
      title: 'string',
      price: 'number',
      description: 'string',
      createdAt: 'number',
      createdBy: 'string',
      modifiedAt: 'number',
      modifiedBy: 'string',
    },
    primaryIndex: { partitionKey: 'merchId' },
    globalIndexes: {
      merchVendor: { partitionKey: 'vendor' },
      merchCreatedTime: { partitionKey: 'createdAt' },
      merchStatus: { partitionKey: 'status' },
    },
    cdk: {
      table: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  const imageTable = new Table(stack, 'image', {
    fields: {
      imageId: 'string',
      merchId: 'string',
      title: 'string',
      url: 'string',
      createdAt: 'number',
      createdBy: 'string',
      modifiedAt: 'number',
      modifiedBy: 'string',
    },
    primaryIndex: { partitionKey: 'imageId', sortKey: 'merchId' },
    globalIndexes: {
      imageMerch: { partitionKey: 'merchId' },
    },
    cdk: {
      table: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  return {
    merchTable,
    imageTable,
  };
}
