import type { StorybookConfig } from '@storybook/nextjs-vite';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@chromatic-com/storybook', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },

  docs: {},

  staticDirs: ['../public'],

  viteFinal(config) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve(__dirname, '../src'),
      },
    };
    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen',
  },
};

export default config;
