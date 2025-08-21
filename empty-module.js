// empty-module.js
// Combined shim attempt 4

// Re-export everything from react-native-web FIRST
//export * from 'react-native-web';

// --- Our Mocks ---

// Mock for TurboModuleRegistry
const MockTurboModuleRegistry = {
  getEnforcing: (name) => {
    console.warn(
      `MockTurboModuleRegistry.getEnforcing("${name}") called. Returning specific mock object.`
    );
    // Check if the requested module is the Skia one
    if (name === 'RNSkiaModule') {
      // Return an object matching the Spec interface for Skia
      return {
        install: () => {
          console.log("Mock RNSkiaModule.install() called on web. Returning true.");
          // Simulate successful installation for web? Or maybe false?
          // Check Skia docs or code for expected web behavior. Assume true for now.
          return true;
        },
        // Add other methods from Spec if NativeSkiaModule.ts uses them
      };
    }
    // For other modules, return a generic empty object or proxy
    console.warn(` MockTurboModuleRegistry.getEnforcing called for unknown module "${name}". Returning {}.`);
    return {}; // Changed from Proxy to simple empty object for non-Skia modules for simplicity
  },
};

// Export TurboModuleRegistry directly
export const TurboModuleRegistry = MockTurboModuleRegistry;

// Mock NativeModules and include TurboModuleRegistry within it
//import { NativeModules as RNWNativeModules } from 'react-native-web';
export const NativeModules = {
  ...(RNWNativeModules || {}),
  TurboModuleRegistry: MockTurboModuleRegistry,
  // Add RNSkiaModule directly to NativeModules as well? Might be needed.
  RNSkiaModule: MockTurboModuleRegistry.getEnforcing('RNSkiaModule'),
};

// Specific mocks for internal imports
export const customDirectEventTypes = {};
export const PressabilityDebugView = () => null;
export const codegenNativeComponent = () => null;
export const RNRenderer = {};
export const ReactFabricPublicInstance = { getInspectorDataForInstance: () => {} };
export const ReactFabric = {};
export const ReactNativeViewConfigRegistry = { customDirectEventTypes: {} };

// Simple default export
export default {};

// ---- Side effect check ----
console.log("--- Combined Shim Attempt 4 Loaded ---");
window.__COMBINED_SHIM_LOADED_4__ = true;