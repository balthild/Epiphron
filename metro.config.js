const { getDefaultConfig } = require('expo/metro-config');

const { generateRemixGlyphMap } = require('./metro.config.d/remix');

generateRemixGlyphMap();

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: false,
});

module.exports = config;
