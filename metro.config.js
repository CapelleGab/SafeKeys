const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Configuration pour résoudre les modules locaux
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(__dirname, "../SafeKeys-core/node_modules"),
];

config.watchFolders = [path.resolve(__dirname, "../SafeKeys-core")];

// Polyfills pour les modules Node.js dans React Native
config.resolver.alias = {
  ...config.resolver.alias,
  crypto: require.resolve("crypto-js"),
  stream: require.resolve("stream-browserify"),
  buffer: require.resolve("buffer"),
  process: require.resolve("process/browser"),
};

// Ajouter les polyfills aux modules à résoudre
config.resolver.platforms = ["native", "ios", "android", "web"];

module.exports = withNativeWind(config, { input: "./app/globals.css" });
