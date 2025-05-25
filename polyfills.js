/**
 * Polyfills pour React Native
 * Nécessaires pour le bon fonctionnement de crypto-js et autres modules
 */

// Polyfill pour les valeurs aléatoires cryptographiques
import "react-native-get-random-values";

// Polyfill pour URL
import "react-native-url-polyfill/auto";

// Polyfill pour Buffer si nécessaire
if (typeof global.Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

// Polyfill pour process si nécessaire
if (typeof global.process === "undefined") {
  global.process = require("process");
}

console.log("✅ Polyfills React Native chargés");
