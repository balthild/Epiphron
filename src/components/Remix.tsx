import createIconSet from '@expo/vector-icons/createIconSet';
import { decodeXML } from 'entities';
import { Asset } from 'expo-asset';
import glyphData from 'remixicon/fonts/remixicon.glyph.json';

export type IconName = keyof typeof glyphData;

const glyphMap = {} as Record<IconName, string>;

for (const [name, value] of Object.entries(glyphData)) {
  glyphMap[name as IconName] = decodeXML(value.unicode);
}

const asset = Asset.fromModule(require('remixicon/fonts/remixicon.ttf'));

export const Remix = createIconSet(glyphMap, 'remixicon', asset.uri);
