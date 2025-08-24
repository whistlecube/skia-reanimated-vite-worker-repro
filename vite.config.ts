import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';


const extensions = [
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
  '.mjs',
];

const development = process.env.NODE_ENV === 'development';

export default defineConfig({
  clearScreen: true,
  plugins: [
    nodePolyfills({
      globals: {
        global: true,
      },
    }),
    react({
      babel: {
        plugins: [
          '@babel/plugin-transform-export-namespace-from',
          'react-native-worklets/plugin',
        ],
      },
    }),
    ...(development
      ? []
      : [
          babel({
            include: [/node_modules\/(react-native|@react-native)/],
            babelConfig: {
              presets: [
                '@babel/preset-react'
              ],
              plugins: [
                [
                  // this is a fix for reanimated not working in production
                  '@babel/plugin-transform-modules-commonjs',
                  {
                    strict: false,
                    strictMode: false, // prevent "use strict" injections
                    allowTopLevelThis: true, // dont rewrite global `this` -> `undefined`
                  },
                ],
              ],
            },
          }),
        ]),
  ],
  define: {
    __DEV__: JSON.stringify(development),
    DEV: JSON.stringify(development),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'global.__x': {},
    _frameTimestamp: undefined,
    _WORKLET: false,
  },
  resolve: {
    extensions,
    alias: {
      'react-native': 'react-native-web',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      jsx: 'automatic',
      loader: { '.js': 'jsx' },
    },
  },
});
