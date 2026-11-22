import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourname.caplayground',
  appName: 'CAPlayground',
  webDir: 'out',
  ios: {
    contentInset: 'always',
  },
};

export default config;
