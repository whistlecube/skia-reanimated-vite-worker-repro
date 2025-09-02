# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite application that integrates React Native Skia and Reanimated for cross-platform animations, deployed to Cloudflare Workers. The project is a minimal reproduction case for debugging production animation issues where Skia + Reanimated animations don't work in production but may work in development.

## Key Dependencies

- **@shopify/react-native-skia**: Canvas rendering and animations
- **react-native-reanimated**: Animation library with worklets
- **react-native-worklets**: Worklet support for JavaScript threads
- **react-native-web**: React Native components for web
- **@cloudflare/vite-plugin**: Cloudflare Workers integration

## Development Commands

```bash
# Install dependencies
bun install

# Development server (currently has issues in this reproduction)
bun run dev

# Build the project
bun run build

# Preview production build locally
bun run preview

# Deploy to Cloudflare Workers
bun run deploy

# Lint code
bun run lint

# Generate Cloudflare Worker types
bun run cf-typegen
```

## Architecture

### Build Configuration
The project uses a complex Vite configuration that handles React Native compatibility:

- **React Native Web Alias**: `react-native` is aliased to `react-native-web`
- **Extension Resolution**: Custom extension priority for web/native files
- **Babel Transforms**: Special handling for React Native packages in production
- **Worklets Plugin**: Enables React Native Reanimated worklets
- **Node Polyfills**: Required for React Native dependencies

### Production-Specific Issues
The build includes special Babel configuration for production to handle Reanimated compatibility:
- CommonJS transformation for React Native packages
- Strict mode disabled to prevent issues
- Global `this` handling for worklet execution

### Cloudflare Workers Integration
- Worker entry point: `worker/index.ts`
- Static assets served from `dist/` directory
- SPA routing configured for client-side navigation
- API routes handled via `/api/*` prefix

### TypeScript Configuration
Multi-configuration setup:
- `tsconfig.app.json`: Main application code
- `tsconfig.node.json`: Vite/Node configuration
- `tsconfig.worker.json`: Cloudflare Worker code
- `worker-configuration.d.ts`: Worker-specific type definitions

## Known Issues

The main issue this reproduction demonstrates is that Skia + Reanimated animations fail to run in production builds, despite the complex build configuration attempting to address this.