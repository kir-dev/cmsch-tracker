import { ConfigContext } from '@expo/config';

require('dotenv').config();

export default ({ config }: ConfigContext) => {
  config = {
    ...config,
    extra: {
      // eas: {
      //   projectId: 'unknown',
      // },
    },
    // updates: {
    //   url: 'unknown',
    // },
    // runtimeVersion: {
    //   policy: 'sdkVersion',
    // },
  };
  return config;
};
