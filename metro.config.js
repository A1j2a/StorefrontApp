const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { syncEnv } = require('./scripts/syncEnv');

// Keep src/config/env.generated.ts synced whenever Metro starts.
syncEnv();

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
