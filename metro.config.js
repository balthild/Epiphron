const path = require('path');
const fs = require('fs');
const { decodeXML } = require('entities');
const { getDefaultConfig } = require('expo/metro-config');

// Generate glyph map for remixicon
const nodeModules = path.resolve(__dirname, 'node_modules');

const glyphData = JSON.parse(
  fs.readFileSync(
    path.join(nodeModules, 'remixicon/fonts/remixicon.glyph.json'),
  ),
);

const glyphMap = {};
for (const [name, value] of Object.entries(glyphData)) {
  glyphMap[name] = decodeXML(value.unicode);
}

const moduleName = 'remixicon-glyph-map';
const modulePath = path.join(nodeModules, `.cache/virtual/${moduleName}.ts`);

fs.mkdirSync(path.dirname(modulePath), { recursive: true });
fs.writeFileSync(modulePath, 'export default ' + JSON.stringify(glyphMap));

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: false,
});

module.exports = config;
