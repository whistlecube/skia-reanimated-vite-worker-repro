import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { cloudflare } from "@cloudflare/vite-plugin";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const extensions = [
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
];

export default defineConfig({
  plugins: [
    react(),
    cloudflare(),
    nodePolyfills({
      include: ['fs', 'path'],
      globals: {
        Buffer: false,
        global: true,
        process: false,
      },
      protocolImports: true,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      loader: {
        '.js': 'jsx',
      },
      define: {
        global: 'globalThis',
        __DEV__: 'false',
      },
    },
  },
  resolve: {
    extensions: extensions,
    alias: {
      // Point 'react-native' and all specific internal paths to the combined shim at the root
      'react-native/Libraries/ReactNative/ReactFabricPublicInstance/ReactFabricPublicInstance': resolve(__dirname, 'empty-module.js'),
      'react-native/Libraries/Renderer/shims/ReactNative': resolve(__dirname, 'empty-module.js'),
      'react-native/Libraries/Renderer/shims/ReactNativeViewConfigRegistry': resolve(__dirname, 'empty-module.js'),
      'react-native/Libraries/Pressability/PressabilityDebug': resolve(__dirname, 'empty-module.js'),
      'react-native/Libraries/Utilities/codegenNativeComponent': resolve(__dirname, 'empty-module.js'),
      'react-native/Libraries/Renderer/shims/ReactFabric': resolve(__dirname, 'empty-module.js'),
      'react-native/Libraries/Image/AssetRegistry': resolve(__dirname, 'empty-module.js'),

    }
  },
  build: {
    rollupOptions: {
      input: {
        main: join(__dirname, 'index.html'),
      },
    }
  }
});
