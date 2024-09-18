const path = require('path');
const fs = require('fs');
const { decodeXML } = require('entities');

module.exports.generateRemixGlyphMap = function () {
  const nodeModules = path.resolve(__dirname, '../node_modules');

  const glyphData = JSON.parse(
    fs.readFileSync(`${nodeModules}/remixicon/fonts/remixicon.glyph.json`),
  );

  const glyphMap = {};
  for (const [name, value] of Object.entries(glyphData)) {
    glyphMap[name] = decodeXML(value.unicode);
  }

  const moduleName = 'remixicon-glyph-map';
  const modulePath = `${nodeModules}/.cache/virtual/${moduleName}.ts`;

  fs.mkdirSync(path.dirname(modulePath), { recursive: true });
  fs.writeFileSync(modulePath, 'export default ' + JSON.stringify(glyphMap));
};
