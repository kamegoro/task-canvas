import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@chromatic-com/storybook', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  docs: {},

  staticDirs: ['../public'],

  webpackFinal(config) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }

    // Next.js 16では next/dist/build/swc から isWasm が削除されたため
    // @storybook/nextjs の next-swc-loader-patch.js が失敗するのを回避する
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const swcModule = require('next/dist/build/swc') as Record<string, unknown>;
      if (typeof swcModule.isWasm !== 'function') {
        swcModule.isWasm = () => Promise.resolve(false);
      }
    } catch {
      // swc モジュールが存在しない環境では無視する
    }

    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
