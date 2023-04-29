import { SSTConfig } from 'sst';
import { API } from './stacks/APIStack';
import { Data } from './stacks/DataStack';
import { Permissions } from './stacks/RoleStack';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config(_input) {
    return {
      name: 'merch-rack',
      region: 'us-east-2',
      profile: 'serverless-agent',
    };
  },
  stacks(app) {
    app.stack(Data);
    app.stack(Permissions);
    app.stack(API);
  },
} satisfies SSTConfig;
