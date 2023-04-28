import { SSTConfig } from 'sst';
import { API } from './stacks/MyStack';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config(_input) {
    return {
      name: 'merch-rack',
      region: 'us-east-1',
      profile: 'serverless-agent',
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
